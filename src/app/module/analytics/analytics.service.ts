import config from "../../config";
import { prisma } from "../../lib/prisma";
import { renderTemplate, sendMail } from "../../lib/nodemailer";
import {
  getZonedDayRange,
  getZonedDayRangeFromIso,
} from "../../utils/dayRange";

type VisitInput = {
  visitorId: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  userId?: string;
};

type VisitSummaryInput = {
  date?: string;
  includeLastSixHours?: boolean;
};

/**
 * Records one page view. A repeated view of the same path by the same browser
 * inside five minutes is ignored, which keeps re-renders/HMR from inflating the
 * page-view count while still allowing a visitor's distinct pages to count.
 */
const recordVisit = async (payload: VisitInput) => {
  const since = new Date(Date.now() - 5 * 60 * 1000);
  const duplicate = await prisma.visit.findFirst({
    where: {
      visitorId: payload.visitorId,
      path: payload.path || "/",
      createdAt: { gte: since },
    },
    select: { id: true },
  });

  if (duplicate) {
    return { recorded: false, reason: "duplicate" as const };
  }

  await prisma.visit.create({
    data: {
      visitorId: payload.visitorId,
      ...(payload.userId ? { userId: payload.userId } : {}),
      path: payload.path?.trim() || "/",
      referrer: payload.referrer?.trim() || "",
      userAgent: payload.userAgent?.slice(0, 500) || "",
      ip: payload.ip || "",
    },
  });

  return { recorded: true as const };
};

const countDistinct = (visits: Array<{ visitorId: string }>) =>
  new Set(visits.map((visit) => visit.visitorId)).size;

/** Public homepage metrics; expose aggregate counts only. */
const getPublicStats = async () => {
  const [
    visitors,
    publishedVisualizations,
    chapterVisualizations,
    legacyCarousels,
  ] =
    await Promise.all([
      prisma.visit.findMany({
        distinct: ["visitorId"],
        select: { visitorId: true },
      }),
      prisma.visualization.count({ where: { status: "PUBLISHED" } }),
      prisma.libraryVisualization.findMany({
        where: { isActive: true },
        select: { html: true },
      }),
      prisma.learnCarousel.findMany({
        where: {
          isActive: true,
          kind: "EXPLANATION",
          slug: { startsWith: "legacy-" },
        },
        select: { html: true },
      }),
    ]);

  // A chapter visualization is a multi-page lesson. Count its teachable pages
  // so the homepage reflects the amount of learning content, not just files.
  const chapterVisualizationPages = chapterVisualizations.reduce(
    (total, visualization) =>
      total + (visualization.html.match(/A\.page\(/g)?.length ?? 0),
    0,
  );
  const legacyLessonCount = legacyCarousels.reduce(
    (total, carousel) =>
      total + (carousel.html.match(/(?:^|\n)\s*lesson\(\s*['"]/g)?.length ?? 0),
    0,
  );

  return {
    uniqueVisitors: visitors.length,
    visualizations:
      publishedVisualizations + chapterVisualizationPages + legacyLessonCount,
  };
};

export const buildVisitorSummary = async (input: VisitSummaryInput = {}) => {
  const range = input.date
    ? getZonedDayRangeFromIso(config.report_timezone, input.date)
    : getZonedDayRange(config.report_timezone);

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: range.start, lt: range.end } },
    select: {
      visitorId: true,
      userId: true,
      path: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const pageCounts = new Map<string, number>();
  const signedInVisitors = new Set<string>();

  for (const visit of visits) {
    pageCounts.set(visit.path, (pageCounts.get(visit.path) ?? 0) + 1);
    if (visit.userId) signedInVisitors.add(visit.visitorId);
  }

  const topPages = [...pageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  const summary: {
    date: string;
    label: string;
    start: string;
    end: string;
    visitors: number;
    pageviews: number;
    signedInVisitors: number;
    topPages: Array<{ path: string; count: number }>;
    lastSixHours?: { visitors: number; pageviews: number };
  } = {
    date: range.isoDate,
    label: range.label,
    start: range.start.toISOString(),
    end: range.end.toISOString(),
    visitors: countDistinct(visits),
    pageviews: visits.length,
    signedInVisitors: signedInVisitors.size,
    topPages,
  };

  if (input.includeLastSixHours) {
    const from = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const recent = await prisma.visit.findMany({
      where: { createdAt: { gte: from, lt: new Date() } },
      select: { visitorId: true },
    });

    summary.lastSixHours = {
      visitors: countDistinct(recent),
      pageviews: recent.length,
    };
  }

  return summary;
};

const reportRecipients = () => {
  const recipients = [config.admin_email, ...config.moderator_emails]
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set(recipients)];
};

export const sendVisitorReport = async (date?: string) => {
  const summary = await buildVisitorSummary({
    date,
    includeLastSixHours: !date,
  });

  const recipients = reportRecipients();
  if (recipients.length === 0) {
    console.warn("[cron] No admin/moderator email configured for visitor report.");
    return summary;
  }

  const html = await renderTemplate("visitor-report.ejs", {
    ...summary,
    recipients,
    generatedAt: new Date().toISOString(),
    frontendUrl: config.frontend_url,
    timezone: config.report_timezone,
  });

  await sendMail({
    to: recipients.join(", "),
    subject: `VizTutorBD — ${summary.label} visitor report (${summary.visitors} unique visitors)`,
    html,
  });

  console.log(
    `[cron] Visitor report sent to ${recipients.length} recipient(s): ${summary.visitors} unique visitor(s), ${summary.pageviews} page view(s).`,
  );

  return summary;
};

export const AnalyticsService = {
  recordVisit,
  getPublicStats,
  buildVisitorSummary,
  sendVisitorReport,
};

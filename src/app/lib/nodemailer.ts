import ejs from "ejs";
import nodemailer, { type Transporter } from "nodemailer";
import path from "node:path";
import config from "../config";

const enabled = Boolean(config.smtp_user && config.smtp_password);

export const transporter: Transporter | null = enabled
  ? nodemailer.createTransport(
      config.smtp_host
        ? {
            host: config.smtp_host,
            port: config.smtp_port,
            secure: config.smtp_port === 465,
            auth: {
              user: config.smtp_user,
              pass: config.smtp_password,
            },
          }
        : {
            service: "gmail",
            auth: {
              user: config.smtp_user,
              pass: config.smtp_password,
            },
          },
    )
  : null;

export const verifyMailer = async () => {
  if (!transporter) {
    console.log(
      "[mail] SMTP credentials not configured — emails will be logged to the console.",
    );
    return;
  }

  try {
    await transporter.verify();
    console.log("Nodemailer connected successfully.");
  } catch (error) {
    console.warn(
      "[mail] SMTP verification failed:",
      error instanceof Error ? error.message : error,
    );
  }
};

export const renderTemplate = async (
  template: string,
  data: Record<string, unknown>,
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "app",
    "templates",
    template,
  );
  return ejs.renderFile(templatePath, data);
};

export const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!transporter) {
    console.log(
      `[mail:dev] To: ${options.to} | Subject: ${options.subject}\n${options.html}`,
    );
    return;
  }

  await transporter.sendMail({
    from: config.email_sender,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { requestLogger } from "./app/middleware/requestLogger";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { ChatRoutes } from "./app/module/chat/chat.route";
import { ForumRoutes } from "./app/module/forum/forum.route";
import { HealthController } from "./app/module/health/health.controller";
import { HealthRoutes } from "./app/module/health/health.route";
import { KnowledgeRoutes } from "./app/module/knowledge/knowledge.route";
import { ModerationRoutes } from "./app/module/moderation/moderation.route";
import { QuizRoutes } from "./app/module/quiz/quiz.route";
import { TaxonomyRoutes } from "./app/module/taxonomy/taxonomy.route";
import { TopicRoutes } from "./app/module/topic/topic.route";
import { UserRoutes } from "./app/module/user/user.route";
import { UserStateRoutes } from "./app/module/user-state/user-state.route";
import { VisualizationRoutes } from "./app/module/visualization/visualization.route";

const app: Application = express();

app.use(requestLogger);

app.use(
  cors({
    origin: [
      config.frontend_url,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/user-state", UserStateRoutes);
app.use("/api/v1/taxonomy", TaxonomyRoutes);
app.use("/api/v1/topics", TopicRoutes);
app.use("/api/v1/visualizations", VisualizationRoutes);
app.use("/api/v1/quiz", QuizRoutes);
app.use("/api/v1/chat", ChatRoutes);
app.use("/api/v1/forum", ForumRoutes);
app.use("/api/v1/knowledge", KnowledgeRoutes);
app.use("/api/v1/moderation", ModerationRoutes);
app.use("/api/v1/health", HealthRoutes);

app.get("/", (_req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome to the Math Learning Platform API.",
  });
});

app.get("/health", HealthController.health);

app.use(notFound);
app.use(globalErrorHandler);

export default app;

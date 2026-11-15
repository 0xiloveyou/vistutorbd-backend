import { Router } from "express";
import { rateLimit } from "../../middleware/rateLimit";
import { LearnController } from "./learn.controller";

const router = Router();

// Carousel source lives in MongoDB. A generous per-IP fixed window still lets
// real learners page through while making bulk scraping unattractive.
const carouselLimit = rateLimit({
  namespace: "learn-carousels",
  limit: 120,
  windowSeconds: 60,
});

router.get("/carousels", carouselLimit, LearnController.listCarousels);
router.get("/carousels/:slug", carouselLimit, LearnController.getCarousel);

export const LearnRoutes = router;

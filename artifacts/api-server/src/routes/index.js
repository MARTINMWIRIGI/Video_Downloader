import { Router } from "express";
import healthRouter from "./health";
import mediaRouter from "./media";
const router = Router();
router.use(healthRouter);
router.use(mediaRouter);
export default router;

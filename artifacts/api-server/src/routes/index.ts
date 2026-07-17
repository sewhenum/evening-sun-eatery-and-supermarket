import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/admin", adminAuth);
router.use(adminRouter);

export default router;

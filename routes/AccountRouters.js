import { Router } from "express";
import { getAccountPage } from "../controllers/AccountControlelrs.js";
import { auth } from "../middleware/verifyToken.js";
import { logger } from "../middleware/logger.js";
const router = Router();

router.get('/account', auth,logger, getAccountPage);

export default router;
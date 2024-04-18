import express from "express";

import userController from "../controllers/user.controller";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/signup", jwtCheck, userController.signup);

export default router;

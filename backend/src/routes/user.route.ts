import express from "express";

import userController from "../controllers/user.controller";

// middlewares
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, userController.getUser);
router.post("/signup", jwtCheck, userController.signup);
router.put(
  "/update",
  jwtCheck,
  jwtParse,
  validateUserRequest,
  userController.updateUser
);

export default router;

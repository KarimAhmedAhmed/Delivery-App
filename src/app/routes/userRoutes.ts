import express from "express";
import {
  getUserById,
  getUserByIdAndUpdate,
  getUsersByRole,
  login,
  register,
  verifyUser,
} from "../controllers/userControllers";
import { ensureAuth } from "../middlewares/auth";
const router = express.Router();

router.post("/register/:role", register);
router.post("/verify/", verifyUser);
router.post("/login/", login);
router.get("/:userId", ensureAuth, getUserById);
router.get("/role/:role", ensureAuth, getUsersByRole);
router.patch("/:userId", ensureAuth, getUserByIdAndUpdate);

export const UserRouter = router;

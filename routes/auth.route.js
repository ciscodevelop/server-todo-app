import express from "express";
import { registerNewUser,LogoutUser,loginUser,refreshToken } from "../controllers/auth.controller.js";
const router = express.Router();

//REGISTER USER
router.post("/register", registerNewUser);
//LOGIN USER
router.post("/login", loginUser);
//REFRESH TOKEN USER
router.post("/refresh", refreshToken);
//LOGOUT USER
router.post("/logout", LogoutUser);
export default router;

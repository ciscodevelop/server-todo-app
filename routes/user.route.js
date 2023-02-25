import express from "express";
import {
 
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/jwt.middleware.js";
const router = express.Router();

 
//Update a user
router.patch("/:id", updateUser);
//Delete a user
router.delete("/:id", deleteUser);
//Get one user
router.get("/:id",verifyToken, getOneUser);
//Get all users
router.get("/",verifyToken, getAllUsers);
export default router;

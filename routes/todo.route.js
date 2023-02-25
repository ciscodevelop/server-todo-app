import express from "express";
import { getAllTodos, deleteTodo, updateTodo, createNewTodo } from "../controllers/todo.controller.js";
 import verifyToken from "../middleware/jwt.middleware.js";
const router = express.Router();

//Create a new Todo
router.post('/',verifyToken, createNewTodo)
//update a single Todo
router.patch('/:id', updateTodo)
//Delete a single Todo
router.delete('/:id', deleteTodo)
//GET all Todos
router.get('/',verifyToken, getAllTodos)



export default router
import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose.set("strictQuery", false);

const port = process.env.PORT || 8800;




app.use("/api/todos/", todoRoutes);
app.use("/api/users/", userRoutes); 
app.use("/api/auth/", authRoutes); 





app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("MONGODB Connected");
  });
  console.log(`Server listening on port: ${port}`);
});

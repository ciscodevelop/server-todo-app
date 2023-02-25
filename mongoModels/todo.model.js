import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, require: true,  },
    desc: { type: String },
    userId: { type: String, require: true },
    isComplete: { type:Boolean,default: false },
    title: { type: String },
  },
  { timestamps: true }
);
export default  mongoose.model('Todo',todoSchema);
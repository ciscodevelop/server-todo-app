import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    accessToken: { type: String,  },
    refreshToken: { type: [String],  },
    profilePic: { type: String, default: "" },
    conutry: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model("User", userShema);

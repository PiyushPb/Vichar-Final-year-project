import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String },
  credientials: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);

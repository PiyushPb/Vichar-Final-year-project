import mongoose from "mongoose";
import mongooseHidden from "mongoose-hidden";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, hide: true },
  name: { type: String, required: true },
  photo: { type: String },
  credientials: { type: String, required: true },
  verified: { type: Boolean, default: false },
  // resetToken: { type: String },
  // resetTokenExpiry: { type: String },
});

UserSchema.plugin(mongooseHidden({ defaultHidden: { _id: true } }));

export default mongoose.model("User", UserSchema);

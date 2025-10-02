import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  login: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("users", userSchema);

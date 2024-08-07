import mongoose from "mongoose";

const LvlSchema = new mongoose.Schema(
  {
    lvl: Number,
    needExp: Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lvl || mongoose.model("Lvl", LvlSchema);
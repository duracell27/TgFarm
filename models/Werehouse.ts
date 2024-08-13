import { seedEmptyId } from "@/libs/constants";
import mongoose from "mongoose";
import Seed from "./Seed";

const WerehouseSchema = new mongoose.Schema(
  {
    userId: Number,
    seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed.modelName, default: seedEmptyId },
    amount: {type: Number,  default: 0},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Werehouse || mongoose.model("Werehouse", WerehouseSchema);
import { seedEmptyId } from "@/libs/constants";
import mongoose from "mongoose";
import Seed from "./Seed";

const WerehouseSchema = new mongoose.Schema(
  {
    userId: Number,
    seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed.modelName},
    amount: {type: Number,  default: 0},
    type: {type: String, enum: ['seed']}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Werehouse || mongoose.model("Werehouse", WerehouseSchema);
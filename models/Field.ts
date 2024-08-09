import { seedEmptyId } from "@/libs/constants";
import mongoose from "mongoose";
import Seed from "./Seed";

const FieldSchema = new mongoose.Schema(
  {
    userId: Number,
    ordinalNumber: Number,
    seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed.modelName, default: seedEmptyId },
    timeToWater: {type: Number,  default: null},
    status: {type: String, enum: ['waitForPlant','waitForWater', 'waitForFertilize','waitForHervest', 'waitForDig'], default: 'waitForPlant'}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Field || mongoose.model("Field", FieldSchema);
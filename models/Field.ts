import { seedEmptyId } from "@/libs/constants";
import mongoose from "mongoose";
import Seed from "./Seed";

const FieldSchema = new mongoose.Schema(
  {
    userId: Number,
    ordinalNumber: Number,
    seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed.modelName, default: seedEmptyId },
    timeToWater: {type: Date,  default: null},
    timeToFertilize: {type: Date,  default: null},
    timeToHarvest: {type: Date,  default: null},
    status: {type: String, enum: ['waitForPlant','waitForWater', 'waitForFertilize','waitForHarvest', 'waitForDig'], default: 'waitForPlant'}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Field || mongoose.model("Field", FieldSchema);
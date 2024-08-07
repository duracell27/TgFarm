import { seedEmptyId, soilEmptyId } from "@/libs/constants";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: Number,
    firstName: String,
    lastName: String,
    userName: String,
    languageCode: String,
    isPremium: Boolean,
    gold: {type: Number, default: 1000},
    usd: {type: Number, default: 100},
    lvl: {type: Number, default: 1},
    exp: {type: Number, default: 0},
    lastLogin: Date,
    defaultSeed: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', default: seedEmptyId },
    defaultSoil: { type: mongoose.Schema.Types.ObjectId, ref: 'Soil', default: soilEmptyId }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
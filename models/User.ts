import { seedEmptyId, soilEmptyId } from "@/libs/constants";
import mongoose from "mongoose";
import Seed from "./Seed";
import Soil from "./Soil";


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
    defaultSeed: { type: mongoose.Schema.Types.ObjectId, ref: Seed.modelName, default: seedEmptyId, required: [true, 'Seed must belong to a user'] },
    defaultSoil: { type: mongoose.Schema.Types.ObjectId, ref: Soil.modelName, default: soilEmptyId, required: [true, 'Seed must belong to a user'] }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
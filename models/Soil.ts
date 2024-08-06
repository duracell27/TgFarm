import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    timeToHarvest: Number,
    timeToFertilize: Number,
    profit: Number,
    exp: Number,
    quantity: Number,
    imageUrl: String,
    lvl: Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Seed || mongoose.model("Seed", SoilSchema);
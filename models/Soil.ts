import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    priceType: {type: String, enum: ['gold', "usd"]},
    reduceTime: Number,
    exp: Number,
    imageUrl: String,
    lvl: Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Soil || mongoose.model("Soil", SoilSchema);
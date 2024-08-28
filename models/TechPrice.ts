import mongoose from "mongoose";

const FieldPriceSchema = new mongoose.Schema(
  {
    ordinal: Number,
    costUsd: Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FieldPrice || mongoose.model("FieldPrice", FieldPriceSchema);
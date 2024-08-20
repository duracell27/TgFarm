import mongoose from "mongoose";

const AchiveSchema = new mongoose.Schema(
  {
    userId: Number,
    sadovid: {
      count: { type: Number, default: 0 },
      lvl: { type: Number, default: 0 },
    },
    vodoliy: {
      count: { type: Number, default: 0 },
      lvl: { type: Number, default: 0 },
    },
    agronom: {
      count: { type: Number, default: 0 },
      lvl: { type: Number, default: 0 },
    },
    zemlevlasnyk: {
      count: { type: Number, default: 4 },
      lvl: { type: Number, default: 0 },
    },
    mehanizator: {
      count: { type: Number, default: 0 },
      lvl: { type: Number, default: 0 },
    },
    achiveCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Achive || mongoose.model("Achive", AchiveSchema);

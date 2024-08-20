import mongoose from "mongoose";

const AchiveSchema = new mongoose.Schema(
  {
    userId: Number, 
    sadovid: {
        count: {type: Number, default: 0},
        lvl: {type: Number, default:0},
        steps: [0, 10, 50, 100, 1000, 5000]
    },
    achiveCount: {type: Number, default:0}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Achive || mongoose.model("Achive", AchiveSchema);
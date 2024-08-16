
import mongoose from "mongoose";


const ConvertSchema = new mongoose.Schema(
  {
    userId: Number,
    converted: {type: Number,  default: 0},
    convertAvaliable: {type: Number,  default: 6},
    lastUpdate: Date 
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Convert || mongoose.model("Convert", ConvertSchema);
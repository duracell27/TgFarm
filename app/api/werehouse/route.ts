import connectDB from "@/libs/connectDb";
import Werehouse from "@/models/Werehouse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId, seedId, amount } = await req.json();

  try {
    await connectDB();

    // Check if the seed already exists in the warehouse for the given user
    const existingRecord = await Werehouse.findOne({ userId, seed: seedId });

    if (existingRecord) {
      // If it exists, update the amount
      existingRecord.amount += amount;
      await existingRecord.save();
    } else {
      // If it doesn't exist, create a new record
      const newRecord = new Werehouse({
        userId,
        seed: seedId,
        amount,
        type: 'seed',
      });
      await newRecord.save();
    }

    return NextResponse.json({ message: "Operation successful" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to add seed" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
  
    const werehouse = await Werehouse.find({ userId }).populate(
      "seed"
    );
  
    return NextResponse.json(werehouse);
  };
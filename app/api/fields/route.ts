import connectDB from "@/libs/connectDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    await connectDB();
    const users = await User.find();

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch users" });
  }
};

import Field from "@/models/Field";
import connectDB from "@/libs/connectDb";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await connectDB();
    const fields = await Field.find({userId}).populate('seed').sort({ordinalNumber:'asc'});

    return NextResponse.json(fields, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch user Fields" },{ status: 500 });
  }
};

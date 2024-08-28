import Achive from "@/models/Achive";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
  
    const achive = await Achive.findOne({ userId });
  
  
    return NextResponse.json(achive);
  }
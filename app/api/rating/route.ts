import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const users = await User.find().sort({ lvl: -1, exp: -1 });
  
    return NextResponse.json(users);
  };
import connectDB from "@/libs/connectDb";
import Seed from "@/models/Seed";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json();
   
    try {
        await connectDB()

        const response = await Seed.create(data)

        return NextResponse.json(response);
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to add seed" });
    }

}
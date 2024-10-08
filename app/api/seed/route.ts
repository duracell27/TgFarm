import connectDB from "@/libs/connectDb";
import Seed from "@/models/Seed";
import { NextRequest, NextResponse } from "next/server";

const seeds = []

export const POST = async (req: NextRequest) => {
     const data = await req.json();
   
    try {
        await connectDB()

        const response = await Seed.create(data)

        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to add seed" }, { status: 500 });
    }

}

export const GET = async (req: NextRequest) => {
   
    try {
        await connectDB()

        const response = await Seed.find().sort({lvl: "asc"})

        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to get seeds" }, { status: 500 });
    }

}
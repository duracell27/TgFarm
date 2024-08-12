import connectDB from "@/libs/connectDb";
import FieldPrice from "@/models/FieldPrice";
import Lvl from "@/models/Lvl";
import { NextResponse } from "next/server";

const fields = [
    { ordinal: 5, costUsd: 10 },
    { ordinal: 6, costUsd: 25 },
    { ordinal: 7, costUsd: 50 },
    { ordinal: 8, costUsd: 100 },
    { ordinal: 9, costUsd: 250 },
    { ordinal: 10, costUsd: 500 },
    { ordinal: 11, costUsd: 500 },
    { ordinal: 12, costUsd: 500 },
    { ordinal: 13, costUsd: 1000 },
    { ordinal: 14, costUsd: 1000 },
    { ordinal: 15, costUsd: 1000 },
    { ordinal: 16, costUsd: 1000 },
    { ordinal: 17, costUsd: 1000 },
    { ordinal: 18, costUsd: 1000 },
    { ordinal: 19, costUsd: 1000 },
    { ordinal: 20, costUsd: 1000 },
    { ordinal: 21, costUsd: 1000 },
    { ordinal: 22, costUsd: 1000 },
    { ordinal: 23, costUsd: 1000 },
    { ordinal: 24, costUsd: 1000 },
    { ordinal: 25, costUsd: 1000 },
    { ordinal: 26, costUsd: 1000 },
    { ordinal: 27, costUsd: 1000 },
    { ordinal: 28, costUsd: 1000 },
    { ordinal: 29, costUsd: 1000 },
    { ordinal: 30, costUsd: 1000 },
    { ordinal: 31, costUsd: 1000 },
    { ordinal: 32, costUsd: 1000 },
    { ordinal: 33, costUsd: 1000 },
    { ordinal: 34, costUsd: 1000 },
    { ordinal: 35, costUsd: 1000 },
    { ordinal: 36, costUsd: 1000 },
    { ordinal: 37, costUsd: 1000 },
    { ordinal: 38, costUsd: 1000 },
    { ordinal: 39, costUsd: 1000 },
    { ordinal: 40, costUsd: 1000 },
    { ordinal: 41, costUsd: 1000 },
    { ordinal: 42, costUsd: 1000 },
    { ordinal: 43, costUsd: 1000 },
    { ordinal: 44, costUsd: 1000 },
    { ordinal: 45, costUsd: 1000 },
    { ordinal: 46, costUsd: 1000 },
    { ordinal: 47, costUsd: 1000 },
    { ordinal: 48, costUsd: 1000 },
    { ordinal: 49, costUsd: 1000 },
    { ordinal: 50, costUsd: 1000 },
]

// export const POST = async () => {
    
   
//     try {
//         await connectDB()

//         const response = await FieldPrice.insertMany(fields)

//         return NextResponse.json(response, { status: 200 });
        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ error: "Failed to add seed" }, { status: 500 });
//     }
// }

export const GET = async () => {
    
    try {
        await connectDB()

        const response = await FieldPrice.find().sort({ ordinal: 1})

        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error when load field prices" }, { status: 500 });
    }
}
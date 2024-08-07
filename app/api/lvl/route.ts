import connectDB from "@/libs/connectDb";
import Lvl from "@/models/Lvl";
import { NextResponse } from "next/server";

const lvls = [
    { lvl: 2, needExp: 30 },
    { lvl: 3, needExp: 48 },
    { lvl: 4, needExp: 77 },
    { lvl: 5, needExp: 120 },
    { lvl: 6, needExp: 190 },
    { lvl: 7, needExp: 290 },
    { lvl: 8, needExp: 460 },
    { lvl: 9, needExp: 720 },
    { lvl: 10, needExp: 1110 },
    { lvl: 11, needExp: 1710 },
    { lvl: 12, needExp: 2620 },
    { lvl: 13, needExp: 3980 },
    { lvl: 14, needExp: 6020 },
    { lvl: 15, needExp: 9050 },
    { lvl: 16, needExp: 13550 },
    { lvl: 17, needExp: 20160 },
    { lvl: 18, needExp: 29840 },
    { lvl: 19, needExp: 43930 },
    { lvl: 20, needExp: 64310 },
    { lvl: 21, needExp: 93640 },
    { lvl: 22, needExp: 135000 },
    { lvl: 23, needExp: 195000 },
    { lvl: 24, needExp: 279000 },
    { lvl: 25, needExp: 398000 },
    { lvl: 26, needExp: 563000 },
    { lvl: 27, needExp: 793000 },
    { lvl: 28, needExp: 1111000 },
    { lvl: 29, needExp: 1546000 },
    { lvl: 30, needExp: 2141000 },
]

// export const POST = async () => {
    
   
//     try {
//         await connectDB()

//         const response = await Lvl.insertMany(lvls)

//         return NextResponse.json(response, { status: 200 });
        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ error: "Failed to add seed" }, { status: 500 });
//     }
// }
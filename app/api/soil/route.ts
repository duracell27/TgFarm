import connectDB from "@/libs/connectDb";
import Soil from "@/models/Soil";
import { NextRequest, NextResponse } from "next/server";

const soils = [
  {name: "Торф", price: 1, priceType: "gold", reduceTime: 1800, exp: 1, imageUrl: "torf.png", lvl: 1},
  {name: "Компост", price: 50, priceType: "gold", reduceTime: 7200, exp: 2, imageUrl: "kompost.png", lvl: 7},
  {name: "Азот", price: 200, priceType: "gold", reduceTime: 21600, exp: 4, imageUrl: "azot.png", lvl: 15},
  {name: "Суперфосфат", price: 2000, priceType: "gold", reduceTime: 32400, exp: 40, imageUrl: "superfosfat.png", lvl: 25},
  {name: "Сульфат", price: 500, priceType: "gold", reduceTime: 32400, exp: 10, imageUrl: "sulfat.png", lvl: 20},
  {name: "Магнезит", price: 1000, priceType: "gold", reduceTime: 54000, exp: 70, imageUrl: "magnesit.png", lvl: 35},
  {name: "Коровяк", price: 1, priceType: "usd", reduceTime: 86400, exp: 100, imageUrl: "korovyak.png", lvl: 15},
  {name: "Біоплант", price: 10000, priceType: "gold", reduceTime: 172800, exp: 300, imageUrl: "bioplant.png", lvl: 40},
];

// export const POST = async (req: NextRequest) => {
//   // const data = await req.json();

//   try {
//     await connectDB();

//     const response = await Soil.insertMany(soils);

//     return NextResponse.json(response,{ status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to add seed" }, { status: 500 });
//   }
// };

export const GET = async (req: NextRequest) => {
   
    try {
        await connectDB()

        const response = await Soil.find()

        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to get seeds" }, { status: 500 });
    }

}

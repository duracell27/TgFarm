import connectDB from "@/libs/connectDb";
import { seedEmptyId } from "@/libs/constants";
import Field from "@/models/Field";
import Seed from "@/models/Seed";
import Soil from "@/models/Soil";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async() =>{

//     const users = await prisma.user.findMany()

//     return NextResponse.json(users)
// }


export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const userId = parseInt(data.id);

  try {
    await connectDB();

    //check for user, if exists return user else create in db
    const user = await User.findOne({ userId }).populate('defaultSeed defaultSoil')
    if (user) {
      //беремо дані користувача і новляємо останній вхід
      user.lastLogin = new Date();
      await user.save();
      console.log("from exist");
      return NextResponse.json(user);
    } else {
      //реєсрація користувача
      console.log("from create");
      const newUser = await User.create({
        userId,
        firstName: data.first_name,
        lastName: data.last_name,
        userName: data.username,
        languageCode: data.language_code,
        isPremium: data.is_premium,
        lastLogin: new Date(),
      });
      await newUser.save();
      //додавання 4 стандартних глядок на початку гри
      await Field.insertMany([
        {
          userId: newUser.userId,
          ordinalNumber: 1,
          seed: seedEmptyId,
          timeToWater: null,
          status: "waitForPlant",
        },
        {
          userId: newUser.userId,
          ordinalNumber: 2,
          seed: seedEmptyId,
          timeToWater: null,
          status: "waitForPlant",
        },
        {
          userId: newUser.userId,
          ordinalNumber: 3,
          seed: seedEmptyId,
          timeToWater: null,
          status: "waitForPlant",
        },
        {
          userId: newUser.userId,
          ordinalNumber: 4,
          seed: seedEmptyId,
          timeToWater: null,
          status: "waitForPlant",
        },
      ]);
      return NextResponse.json(newUser);
    }
  } catch (error) {
    console.log("from user api post", error);
  }
};

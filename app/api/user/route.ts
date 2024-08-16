import connectDB from "@/libs/connectDb";
import User from "@/models/User";
import Field from "@/models/Field";
import { ObjectId } from "bson";
import { NextRequest, NextResponse } from "next/server";
import { seedEmptyId } from "@/libs/constants";
import Convert from "@/models/Convert";

interface UpdateUserRequestData {
  defaultSeedId: ObjectId ; // Use ObjectId for MongoDB, or string if it’s coming as a string
  defaultSoilId: ObjectId ;
  userId: number;
  defType: 'seed' | 'soil'; // Limited to 'seed' or 'soil'
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const user = await User.findOne({ userId }).populate(
    "defaultSeed defaultSoil"
  );

  return NextResponse.json(user);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const userId = parseInt(data.id);

  try {
    await connectDB();

    //check for user, if exists return user else create in db
    const user = await User.findOne({ userId }).populate(
      "defaultSeed defaultSoil"
    );
    if (user) {
      //беремо дані користувача і новляємо останній вхід
      user.lastLogin = new Date();
      await user.save();
      
      return NextResponse.json(user);
    } else {
      //реєсрація користувача
     
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
      // додавання запису для обміну монет
      await Convert.create({
        userId: newUser.userId,
        lastUpdate: new Date()
      })
      return NextResponse.json(newUser);
    }
  } catch (error) {
    console.log("from user api post", error);
  }
};

export const PUT = async (req: NextRequest) => {
  const data: UpdateUserRequestData = await req.json();
  const { defaultSeedId, defaultSoilId, userId, defType } = data;
  try {

    if(defType === 'seed'){
      const updatedUser = await User.findOneAndUpdate(
        { userId },
        {
          defaultSeed: defaultSeedId,
          lastLogin: new Date(), // Update lastLogin to the current date and time
        }
      );
  
      return NextResponse.json(updatedUser);
    }else if(defType === 'soil'){
      const updatedUser = await User.findOneAndUpdate(
        { userId },
        {
          defaultSoil: defaultSoilId,
          lastLogin: new Date(), // Update lastLogin to the current date and time
        }
      );
  
      return NextResponse.json(updatedUser);
    }

    
  } catch (error) {
    console.log("from user api post", error);
  }
};

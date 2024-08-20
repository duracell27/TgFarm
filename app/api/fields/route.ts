import Field from "@/models/Field";
import connectDB from "@/libs/connectDb";
import { ObjectId } from "bson";

import { NextRequest, NextResponse } from "next/server";
import Seed from "@/models/Seed";
import Soil from "@/models/Soil";
import { achiveLvls, seedEmptyId } from "@/libs/constants";
import Achive from "@/models/Achive";

interface UpdateFieldType {
  fieldId: ObjectId;
  seedId: ObjectId;
  fieldUpdateType: "plant" | "water";
  soilId: ObjectId;
  userId: number;
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await connectDB();
    const fields = await Field.find({ userId })
      .populate("seed")
      .sort({ ordinalNumber: "asc" });

    const now = new Date();

    const updatedFields = await Promise.all(
      fields.map(async (field) => {
        if (
          field.timeToHarvest !== null &&
          now > new Date(field.timeToHarvest)
        ) {
          field.status = "waitForHarvest";

          await field.save(); // Save the updated field
        }
        return field;
      })
    );
    // для тесту ачівок
    // await Achive.create({userId})

    return NextResponse.json(fields, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user Fields" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const data: UpdateFieldType = await req.json();
  const { fieldId, seedId, fieldUpdateType, soilId, userId } = data;
  try {
    await connectDB();
    const seed = await Seed.findById(seedId);

    if (!seed) {
      return NextResponse.json({ error: "Seed not found" }, { status: 404 });
    }

    if (fieldUpdateType === "plant") {
      // Calculate timeToWater and timeToFertilize

      const now = new Date();
      const timeToWater = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now
      const timeToFertilize = new Date(
        now.getTime() + (seed.timeToFertilize + 120) * 1000
      ); // seed.timeToFertilize seconds from now
      const timeToHarvest = new Date(now.getTime() + seed.timeToHarvest * 1000);

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          seed: seedId,
          status: "waitForWater",
          timeToWater: timeToWater,
          timeToFertilize: timeToFertilize,
          timeToHarvest: timeToHarvest,
        }
      );

      return NextResponse.json({ message: "Field planted" });
    } else if (fieldUpdateType === "water") {
      const field = await Field.findById(fieldId);
      if (!field) {
        return NextResponse.json({ error: "Field not found" }, { status: 404 });
      }

      const reducedTimeToHarvest = new Date(
        field.timeToHarvest.getTime() - 10 * 60 * 1000
      ); // Subtract 10 minutes

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: "waitForFertilize",
          timeToWater: null,
          timeToHarvest: reducedTimeToHarvest,
        }
      );

      // апдейт досягнень початок
      const achive = await Achive.findOne({ userId });
      achive.vodoliy.count += 1;
      if (achive.vodoliy.count >= achiveLvls.vodoliy[achive.vodoliy.lvl + 1]) {
        achive.vodoliy.lvl += 1;
        achive.achiveCount += 1;
      }

      await achive.save();
      // апдейт досягнень кінець

      return NextResponse.json({ message: "Field watered" });
    } else if (fieldUpdateType === "fertilize") {
      const soil = await Soil.findById(soilId);
      if (!soil) {
        return NextResponse.json({ error: "Soil not found" }, { status: 404 });
      }

      const field = await Field.findById(fieldId);
      if (!field) {
        return NextResponse.json({ error: "Field not found" }, { status: 404 });
      }

      const reducedTimeToHarvest = new Date(
        field.timeToHarvest.getTime() - soil.reduceTime * 1000
      ); // Subtract 10 minutes

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: "waitForHarvest",
          timeToHarvest: reducedTimeToHarvest,
        }
      );

      // апдейт досягнень початок
      const achive = await Achive.findOne({ userId });
      achive.agronom.count += 1;
      if (achive.agronom.count >= achiveLvls.agronom[achive.agronom.lvl + 1]) {
        achive.agronom.lvl += 1;
        achive.achiveCount += 1;
      }

      await achive.save();
      // апдейт досягнень кінець

      return NextResponse.json({ message: "Field fertilized" });
    } else if (fieldUpdateType === "harvest") {
      //const field = await Field.findById(fieldId);

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: "waitForDig",
          timeToHarvest: null,
          timeToFertilize: null,
          timeToWater: null,
          seed: seedEmptyId,
        }
      );

      // апдейт досягнень початок
      const achive = await Achive.findOne({ userId });
      achive.sadovid.count += 1;
      if (achive.sadovid.count >= achiveLvls.sadovid[achive.sadovid.lvl + 1]) {
        achive.sadovid.lvl += 1;
        achive.achiveCount += 1;
      }

      await achive.save();
      // апдейт досягнень кінець

      return NextResponse.json({ message: "Field harvested" });
    } else if (fieldUpdateType === "dig") {
      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: "waitForPlant",
        }
      );
      return NextResponse.json({ message: "Field fertilized" });
    }
  } catch (error) {
    console.log("from user api post", error);
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { userId, ordinal } = data;

  try {
    await connectDB();
    await Field.create({
      userId: userId,
      ordinalNumber: ordinal,
      status: "waitForPlant",
      seed: seedEmptyId,
    });

    // апдейт досягнень початок
    const achive = await Achive.findOne({ userId });
    achive.zemlevlasnyk.count += 1;
    if (achive.zemlevlasnyk.count >= achiveLvls.zemlevlasnyk[achive.zemlevlasnyk.lvl + 1]) {
      achive.zemlevlasnyk.lvl += 1;
      achive.achiveCount += 1;
    }

    await achive.save();
    // апдейт досягнень кінець

    return NextResponse.json({ message: "Bought field" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user Fields" },
      { status: 500 }
    );
  }
};

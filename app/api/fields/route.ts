import Field from "@/models/Field";
import connectDB from "@/libs/connectDb";
import { ObjectId } from "bson";

import { NextRequest, NextResponse } from "next/server";
import Seed from "@/models/Seed";
import Soil from "@/models/Soil";
import { seedEmptyId } from "@/libs/constants";

interface UpdateFieldType {
  fieldId: ObjectId;
  seedId: ObjectId;
  fieldUpdateType: 'plant' | 'water';
  soilId: ObjectId;
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
        if( field.timeToHarvest !== null && (now > new Date(field.timeToHarvest))) {
          field.status = "waitForHarvest";

          await field.save(); // Save the updated field
        }
        return field;
      })
    );

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
  const { fieldId, seedId, fieldUpdateType, soilId } = data;
  try {
    await connectDB();
    const seed = await Seed.findById(seedId);


      if (!seed) {
        return NextResponse.json({ error: 'Seed not found' }, { status: 404 });
      }




    if(fieldUpdateType === 'plant'){
      // Calculate timeToWater and timeToFertilize
     
      const now = new Date();
      const timeToWater = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now
      const timeToFertilize = new Date(now.getTime() + (seed.timeToFertilize + 120) * 1000); // seed.timeToFertilize seconds from now
      const timeToHarvest = new Date(now.getTime() + seed.timeToHarvest * 1000);
   
       const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          seed: seedId,
          status: 'waitForWater',
          timeToWater: timeToWater,
          timeToFertilize: timeToFertilize,
          timeToHarvest: timeToHarvest
        }

      );
  
      return NextResponse.json({message: 'Field planted'});
    }else if(fieldUpdateType === 'water'){

      const field = await Field.findById(fieldId);
      if (!field) {
        return NextResponse.json({ error: 'Field not found' }, { status: 404 });
      }

      


  //     const currentTime = new Date();
  // const reducedTimeToHarvest = new Date(field.timeToHarvest.getTime() - 10 * 60 * 1000); // Subtract 10 minutes

  // let newStatus = 'waitForFertilize';
  // let newTimeToHarvest: Date | null = reducedTimeToHarvest;

  // // Check if reducedTimeToHarvest is less than or equal to current time
  // if (reducedTimeToHarvest <= currentTime) {
  //   newStatus = 'waitForHarvest';
  //   newTimeToHarvest = null; // Set timeToHarvest to null if it's time to harvest
  // }

  // const response = await Field.findOneAndUpdate(
  //   { _id: fieldId },
  //   {
  //     status: newStatus,
  //     timeToWater: null,
  //     timeToHarvest: newTimeToHarvest
  //   }
  // );


      
      const reducedTimeToHarvest = new Date(field.timeToHarvest.getTime() - 10 * 60 * 1000); // Subtract 10 minutes


      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: 'waitForFertilize',
          timeToWater: null,
          timeToHarvest: reducedTimeToHarvest
        }

      );
  
      return NextResponse.json({message: 'Field watered'});
    }else if(fieldUpdateType === 'fertilize'){

      const soil = await Soil.findById(soilId)
      if (!soil) {
        return NextResponse.json({ error: 'Soil not found' }, { status: 404 });
      }


      const field = await Field.findById(fieldId);
      if (!field) {
        return NextResponse.json({ error: 'Field not found' }, { status: 404 });
      }


      const reducedTimeToHarvest = new Date(field.timeToHarvest.getTime() - soil.reduceTime * 1000); // Subtract 10 minutes


      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: 'waitForHarvest',
          timeToHarvest: reducedTimeToHarvest
        }
      );
  
      return NextResponse.json({message: 'Field fertilized'});
    }else if(fieldUpdateType === 'harvest'){
  
      //const field = await Field.findById(fieldId);

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: 'waitForDig',
          timeToHarvest: null,
          timeToFertilize:null,
          timeToWater:null,
          seed: seedEmptyId,
        }

      );
  
      return NextResponse.json({message: 'Field harvested'});
    }else if(fieldUpdateType === 'dig'){
  

      const response = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          status: 'waitForPlant',
        }

      );
      return NextResponse.json({message: 'Field fertilized'});
    }

    
  } catch (error) {
    console.log("from user api post", error);
  }
};

export const POST = async (req: NextRequest) => {

  const data= await req.json();
  const { userId, ordinal} = data;

  try {
    await connectDB();
    await Field.create({
      userId: userId,
      ordinalNumber: ordinal,
      status: 'waitForPlant',
      seed: seedEmptyId,
    })
   
    return NextResponse.json({message: 'Bought field'}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user Fields" },
      { status: 500 }
    );
  }

}

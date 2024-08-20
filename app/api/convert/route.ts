import connectDB from "@/libs/connectDb";
import Convert from "@/models/Convert";
import User from "@/models/User";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

interface UpdateConvertType {
  userId: number;
  amount: number;
  type: "usd-1" | "usd-10" | "gold";
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const convert = await Convert.findOne({ userId });

  // Перевіряємо чи треба оновити ліміт (кожного дня о 00:00)
  const lastUpdate = moment(convert.lastUpdate);
  const now = moment();
  if (!lastUpdate.isSame(now, "day")) {
    convert.convertAvaliable = 6;
    convert.converted = 0;
    convert.lastUpdate = now;
    await convert.save();
  }

  return NextResponse.json(convert);
};

export const PUT = async (req: NextRequest) => {
  const data: UpdateConvertType = await req.json();
  const { userId, amount, type } = data;
  try {
    await connectDB();

    if (type === "usd-1") {
      await User.findOneAndUpdate(
        { userId }, // Filter to find the user by userId
        { $inc: { gold: 2000 } } // Increment the gold field by 1000
      );
      return NextResponse.json({ message: "Converted 1 usd" }, { status: 200 });
    }

    if (type === "usd-10") {
      await User.findOneAndUpdate(
        { userId }, // Filter to find the user by userId
        { $inc: { gold: 20000 } } // Increment the gold field by 1000
      );
      return NextResponse.json(
        { message: "Converted 10 usd" },
        { status: 200 }
      );
    }

    if (type === "gold") {
      const convert = await Convert.findOne({ userId });
      const user = await User.findOne({ userId });

      // Перевіряємо чи треба оновити ліміт (кожного дня о 00:00)
      const lastUpdate = moment(convert.lastUpdate);
      const now = moment();
      if (!lastUpdate.isSame(now, "day")) {
        convert.convertAvaliable = 6;
        convert.converted = 0;
        convert.lastUpdate = now;
        await convert.save();
      }

      // Рахуємо скільки можна конвертувати
      const dollarsToConvert = Math.floor(amount / 1000);

      // Перевіряємо, чи користувач вже досяг ліміту
      if (convert.converted >= convert.convertAvaliable) {
        return NextResponse.json({ message: "ліміт обміну" }, { status: 400 });
      }

      const remainingConvertable = convert.convertAvaliable - convert.converted;
      const actualConversion = Math.min(dollarsToConvert, remainingConvertable);

      if (actualConversion <= 0) {
        return NextResponse.json({ message: "менше ліміту" }, { status: 400 });
      }

      // Оновлюємо користувача і таблицю Convert
      convert.converted += actualConversion;
      user.usd += actualConversion;

      await convert.save();
      await user.save();

      return NextResponse.json(
        { message: "Converted to usd" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to update " }, { status: 500 });
  }
};

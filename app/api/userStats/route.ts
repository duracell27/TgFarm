import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface UserStatsType {
  userId: number;
  expAmount: number;
  goldAmount: number;
  usdAmount: number;
  type: "gold+" | "gold-" | "usd+" | "usd-" | 'exp+';
}

export const PUT = async (req: NextRequest) => {
  const data: UserStatsType = await req.json();
  const { userId, expAmount, goldAmount, usdAmount, type } = data;

  const user = await User.findOne({ userId });

  if (type === "gold-") {
    // check if user hav enough gold
    if (user.gold < goldAmount) {
      return NextResponse.json(
        { message: "Не достатньо золотих", result: false },
        { status: 200 }
      );
    } else {
      user.gold -= goldAmount;
      user.exp += expAmount;

      await user.save();

      return NextResponse.json({ message: "gold -", result: true },{ status: 200 });
    }
  } else if (type === "gold+") {
    user.gold += goldAmount;
    user.exp += expAmount;

    await user.save();

    return NextResponse.json({ message: "gold +", result: true },{ status: 200 });
  } else if (type === "usd-") {
    // check if user hav enough usd
    if (user.usd < usdAmount) {
      return NextResponse.json(
        { message: "Не достатньо доларів", result: false },
        { status: 200 }
      );
    } else {
      user.usd -= usdAmount;
      user.exp += expAmount;

      await user.save();

      return NextResponse.json({ message: "usd -", result: true },{ status: 200 });
    }
  } else if (type === "usd+") {
    user.usd += usdAmount;
    user.exp += expAmount;

    await user.save();

    return NextResponse.json({ message: "usd +", result: true },{ status: 200 });
  } else if (type === "exp+") {
    user.exp += expAmount;

    await user.save();

    return NextResponse.json({ message: "exp +", result: true },{ status: 200 });
  }


  return NextResponse.json({ message: "Помилка при перевірці даних", result: false }, { status: 400 });
};

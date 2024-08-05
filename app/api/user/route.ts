
import { NextRequest, NextResponse } from "next/server";

// export const GET = async() =>{

//     const users = await prisma.user.findMany()

//     return NextResponse.json(users)
// }

export const POST = async (req: NextRequest) => {
  const data = await req.json();


  return NextResponse.json({ created: "already exists" });
};

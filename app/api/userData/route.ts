
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');


    return NextResponse.json({ succes: userId });
}

// const userData = await prisma.userData.findUnique({
    //     where:{
    //         user: userId
    //     }
    // })
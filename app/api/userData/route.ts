
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {

    const userId = req.nextUrl.searchParams.get('userId');


    return NextResponse.json({ succes: true });
}

// const userData = await prisma.userData.findUnique({
    //     where:{
    //         user: userId
    //     }
    // })
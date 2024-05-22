import prisma from "@/libs/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId || typeof userId !== "string")
    return NextResponse.json(
      { message: "An error occurred", data: "User id is not valid" },
      { status: 400 }
    );

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const countFollowers = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...user, countFollowers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { currentUser } = await serverAuth();

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

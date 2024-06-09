import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

const getUser = async (userId?: string) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid Id");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User does not exists");
  }

  return user;
};

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();

    const user = await getUser(userId);

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    
    try {
      if (userId) {
        await prisma.notification.create({
          data: {
            body: "Someone followed you",
            userId: userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();

    const user = await getUser(userId);

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

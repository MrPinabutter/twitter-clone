import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

const getLikedIds = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return [...(post?.likedIds || [])];
};

export async function POST(req: Request) {
  const { postId } = await req.json();
  const { currentUser } = await serverAuth();

  if (!currentUser) {
    return NextResponse.json(
      { message: "An error occurred", data: "User is unauthorized!" },
      { status: 401 }
    );
  }

  if (!postId || typeof postId !== "string")
    return NextResponse.json(
      { message: "An error occurred", data: "Post id is not valid" },
      { status: 400 }
    );

  try {
    let updatedLikedIds = [...(await getLikedIds(postId)), currentUser.id];

    const response = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const { postId } = await req.json();
  const { currentUser } = await serverAuth();

  if (!currentUser) {
    return NextResponse.json(
      { message: "An error occurred", data: "User is unauthorized!" },
      { status: 401 }
    );
  }

  if (!postId || typeof postId !== "string")
    return NextResponse.json(
      { message: "An error occurred", data: "Post id is not valid" },
      { status: 400 }
    );

  try {
    let updatedLikedIds = (await getLikedIds(postId)).filter(
      (it) => it !== currentUser.id
    );

    const response = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

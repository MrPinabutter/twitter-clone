import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { body, postId } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your tweet",
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

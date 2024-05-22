import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

export async function GET(req: NextApiRequest) {
  const url = req.url ? new URL(req.url) : undefined;
  const searchParams = url ? new URLSearchParams(url.search) : undefined;
  const userId = searchParams?.get("userId");

  try {
    const posts = await prisma.post.findMany({
      ...(userId && typeof userId === "string"
        ? {
            where: {
              userId,
            },
          }
        : {}),
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

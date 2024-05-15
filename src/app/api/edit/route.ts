import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const { name, username, bio, profileImage, coverImage } = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
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

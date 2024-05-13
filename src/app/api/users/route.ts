import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

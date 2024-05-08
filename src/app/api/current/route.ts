import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth(await req.json());

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", data: error },
      { status: 400 }
    );
  }
}

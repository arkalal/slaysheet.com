import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import NewUserAuth from "../../../../models/newUserAuth";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectMongoDB();
    await NewUserAuth.create(body);

    return NextResponse.json({ message: "user registered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "registration failed" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    connectMongoDB();
    const user = await NewUserAuth.find();

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }
}

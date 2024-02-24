import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import NewUserAuth from "../../../../models/newUserAuth";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { password, ...rest } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await NewUserAuth.create({ password: hashedPassword, ...rest });

    return NextResponse.json({ message: "user registered" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    connectMongoDB();
    const user = await NewUserAuth.find();

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

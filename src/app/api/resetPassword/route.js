import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import NewUserAuth from "../../../../models/newUserAuth";
import connectMongoDB from "../../../../utils/mongoDB";

export async function POST(req) {
  const { email, password } = await req.json();

  await connectMongoDB();
  const user = await NewUserAuth.findOne({
    email,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  if (!user) {
    return NextResponse.json(
      { message: "User reser password failed" },
      { status: 400 }
    );
  }

  try {
    await user.save();
    return NextResponse.json(
      { message: "User password has been changed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

import { NextResponse } from "next/server";
import crypto from "crypto";
import connectMongoDB from "../../../../utils/mongoDB";
import NewUserAuth from "../../../../models/newUserAuth";

export async function POST(req) {
  const { email } = await req.json();

  await connectMongoDB();
  const user = await NewUserAuth.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "email is not there" },
      { status: 400 }
    );
  }
}

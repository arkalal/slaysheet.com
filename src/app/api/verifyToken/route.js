import NewUserAuth from "../../../../models/newUserAuth";
import connectMongoDB from "../../../../utils/mongoDB";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  await connectMongoDB();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await NewUserAuth.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid token or has expired" },
      { status: 400 }
    );
  }

  return NextResponse.json(JSON.stringify(user), { status: 200 });
}

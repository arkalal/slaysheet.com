import { NextResponse } from "next/server";
import Users from "../../../../models/users";
import connectMondoDB from "../../../../utils/mongoDB";

export async function POST(req) {
  const { name, email } = await req.json();
  await connectMondoDB();
  await Users.create({ name, email });
  return NextResponse.json({ message: "user registered" }, { status: 201 });
}

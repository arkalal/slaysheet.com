import { NextResponse } from "next/server";
import Users from "../../../../models/users";
import connectMongoDB from "../../../../utils/mongoDB";

export async function POST(req) {
  const { name, email } = await req.json();
  await connectMongoDB();
  await Users.create({ name, email });
  return NextResponse.json({ message: "user registered" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const user = await Users.find();
  return NextResponse.json({ user }, { status: 200 });
}

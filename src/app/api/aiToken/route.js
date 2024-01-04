import { getServerSession } from "next-auth";
import AiLimit from "../../../../models/aiLimit";
import connectMongoDB from "../../../../utils/mongoDB";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  await connectMongoDB();
  const aiToken = await AiLimit.find();
  return NextResponse.json(aiToken);
}

export async function POST(req) {
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  const body = await req.json();
  await connectMongoDB();
  await AiLimit.create(body);

  return NextResponse.json({ message: "aiToken Created" }, { status: 200 });
}

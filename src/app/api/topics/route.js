import { NextResponse } from "next/server";
import Topic from "../../../../models/topic";
import connectMongoDB from "../../../../utils/mongoDB";

export async function POST(request) {
  const { title, description, userId } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description, userId });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}

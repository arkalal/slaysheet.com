import { NextResponse } from "next/server";
import Topic from "../../../../models/topic";
import connectMondoDB from "../../../../utils/mongoDB";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMondoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMondoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMondoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}

import { NextResponse } from "next/server";
import Topic from "../../../../../models/topic";
import connectMondoDB from "../../../../../utils/mongoDB";

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, userId } = await req.json();
  await connectMondoDB();
  await Topic.findByIdAndUpdate(id, { title, description, userId });
  return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectMondoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}

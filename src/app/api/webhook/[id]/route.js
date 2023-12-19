import UserSubscription from "../../../../../models/userSubscription";
import connectMongoDB from "../../../../../utils/mongoDB";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  await connectMongoDB();
  await UserSubscription.findByIdAndUpdate(id, body);
  return NextResponse.json({ message: "webhook updated" }, { status: 200 });
}

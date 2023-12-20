import NewUserAuth from "../../../../../models/newUserAuth";
import connectMongoDB from "../../../../../utils/mongoDB";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  await connectMongoDB();
  await NewUserAuth.findByIdAndUpdate(id, body);
  return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

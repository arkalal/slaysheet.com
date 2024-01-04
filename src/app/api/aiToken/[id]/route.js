import { getServerSession } from "next-auth";
import AiLimit from "../../../../../models/aiLimit";
import connectMongoDB from "../../../../../utils/mongoDB";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  const { id } = params;
  const body = await req.json();
  await connectMongoDB();
  await AiLimit.findByIdAndUpdate(id, body);

  return NextResponse.json({ message: "aiToken Updated" }, { status: 200 });
}

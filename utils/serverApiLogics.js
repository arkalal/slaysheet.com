"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectMongoDB from "./mongoDB";
import AiLimit from "../models/aiLimit";

export const chatLogic = async () => {
  const userSession = await getServerSession(authOptions);

  await connectMongoDB();
  const isUserToken = await AiLimit.findOne({ user: userSession.user.email });

  if (isUserToken) {
    const data = {
      user: userSession.user.email,
      count: isUserToken.count - 1,
      lock: false,
    };
    await AiLimit.findOneAndUpdate(
      {
        user: userSession.user.email,
      },
      data
    );
  }

  if (isUserToken.count === 1) {
    const data = {
      user: userSession.user.email,
      count: isUserToken.count - 1,
      lock: true,
    };

    await AiLimit.findOneAndUpdate(
      {
        user: userSession.user.email,
      },
      data
    );
  }

  return {
    isUserToken: isUserToken,
  };
};

"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectMongoDB from "./mongoDB";
import AiLimit from "../models/aiLimit";
import { baseUrlTest } from "../axios/baseUrl";
import UserSubscription from "../models/userSubscription";
import NewUserAuth from "../models/newUserAuth";

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
    ).lean();
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
    isUserToken: isUserToken
      ? {
          count: isUserToken.count,
          user: isUserToken.user,
          lock: isUserToken.lock,
        }
      : null,
  };
};

export const AddTokensLogic = async (isFree) => {
  const userSession = await getServerSession(authOptions);

  if (!isFree) {
    try {
      await connectMongoDB();
      const isUserToken = await AiLimit.findOne({
        user: userSession.user.email,
      }).lean();

      if (isUserToken) {
        const data = {
          user: userSession.user.email,
          count: isUserToken.count + 5,
          lock: false,
        };
        await AiLimit.findOneAndUpdate(
          {
            user: userSession.user.email,
          },
          data
        );
      }

      const checkout = await fetch(`${baseUrlTest}/api/checkout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const priceData = await checkout.json();

      const filteredPriceData = priceData?.filter(
        (item) => item.nickname === "AI Tokens Plan"
      );

      await connectMongoDB();
      await UserSubscription.findOneAndUpdate(
        {
          user: userSession.user.email,
          productId: filteredPriceData[0].product,
        },
        {
          tokenPurchased: false,
        }
      );

      return {
        isUserToken: isUserToken
          ? { count: isUserToken.count, user: isUserToken.user }
          : null,
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    await connectMongoDB();
    const isUserToken = await AiLimit.findOne({
      user: userSession.user.email,
    }).lean();

    if (!isUserToken) {
      const aiTokenData = {
        user: userSession.user.email,
        count: 5,
        lock: false,
      };
      await AiLimit.create(aiTokenData);
    }

    await NewUserAuth.findOneAndUpdate(
      {
        email: userSession.user.email,
      },
      {
        freeTokens: false,
      }
    );

    return {
      isUserToken: isUserToken
        ? { count: isUserToken.count, user: isUserToken.user }
        : null,
    };
  }
};

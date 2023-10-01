import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserSubscription from "../models/userSubscription";

const subscribedData = async () => {
  const userSession = await getServerSession(authOptions);

  const subscribedData = await UserSubscription.findOne({
    user: userSession?.user.email,
  });

  return subscribedData;
};

export default subscribedData;

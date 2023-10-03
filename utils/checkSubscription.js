import { currentUser } from "@clerk/nextjs";
import UserSubscription from "../models/userSubscription";

const checkSubscription = async () => {
  const user = await currentUser();
  const userSubscription = await UserSubscription.findOne({
    user: user.emailAddresses[0].emailAddress,
  });

  if (!userSubscription) {
    return false;
  } else {
    return true;
  }
};

export default checkSubscription;

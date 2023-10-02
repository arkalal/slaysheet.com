import UserSubscription from "../models/userSubscription";

const subscribedData = async () => {
  const subscribedData = await UserSubscription.findOne({
    user: "",
  });

  return subscribedData;
};

export default subscribedData;

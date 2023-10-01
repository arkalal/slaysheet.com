import React from "react";
import Services from "../../../components/Services/Services";
import { getServerSession } from "next-auth";
import UserSubscription from "../../../models/userSubscription";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Service = async () => {
  const userSession = await getServerSession(authOptions);

  const subscribedData = await UserSubscription.findOne({
    user: userSession?.user.email,
  });

  return (
    <div>
      <Services
        subscribedId={subscribedData?._id}
        isSubscribed={subscribedData ? true : false}
      ></Services>
    </div>
  );
};

export default Service;

import React from "react";
import Services from "../../../components/Services/Services";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserSubscription from "../../../models/userSubscription";

const Service = async () => {
  const userSession = await getServerSession(authOptions);

  // const subscribedData = await UserSubscription.findOne({
  //   user: userSession?.user.email,
  // });

  return (
    <div>
      <Services
      // subscribedId={subscribedData?._id}
      // isSubscribed={subscribedData ? true : false}
      ></Services>
      <p>services</p>
    </div>
  );
};

export default Service;

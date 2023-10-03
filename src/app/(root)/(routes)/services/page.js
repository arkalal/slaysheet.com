import React from "react";
import Services from "../../../../../components/Services/Services";
import checkSubscription from "../../../../../utils/checkSubscription";

const Service = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Services
        // subscribedId={data && data?._id}
        isSubscribed={isPro}
      ></Services>
    </div>
  );
};

export default Service;

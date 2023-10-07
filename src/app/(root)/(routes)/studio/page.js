import React from "react";
import Services from "../../../../../components/Services/Services";
import checkSubscription from "../../../../../utils/checkSubscription";

const Studio = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Services isSubscribed={isPro}></Services>
    </div>
  );
};

export default Studio;

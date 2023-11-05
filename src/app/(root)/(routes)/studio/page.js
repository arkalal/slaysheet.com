import React from "react";
import checkSubscription from "../../../../../utils/checkSubscription";
import Services from "../../../../../components/Screens/StudioScreen/Services/Services";

const Studio = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Services isSubscribed={isPro}></Services>
    </div>
  );
};

export default Studio;

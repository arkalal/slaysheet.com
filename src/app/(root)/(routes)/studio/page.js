import React from "react";
import checkSubscription from "../../../../../utils/checkSubscription";
import dynamic from "next/dynamic";

const Studio = async () => {
  const isPro = await checkSubscription();

  const Services = dynamic(
    () =>
      import(
        "../../../../../components/Screens/StudioScreen/Services/Services"
      ),
    {
      ssr: false,
    }
  );

  return (
    <div>
      <Services isSubscribed={isPro}></Services>
    </div>
  );
};

export default Studio;

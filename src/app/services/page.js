import React from "react";
import Services from "../../../components/Services/Services";
import subscribedData from "../../../utils/subscribedData";

const Service = async () => {
  const subscribedData = await subscribedData();
  console.log(subscribedData);

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

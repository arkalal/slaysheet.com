import React from "react";
import Services from "../../../components/Services/Services";
// import subscribedData from "../../../utils/subscribedData";

const Service = async () => {
  // const newSubscribe = await subscribedData();
  // console.log(subscribedData());

  return (
    <div>
      <Services
      // subscribedId={newSubscribe?._id}
      // isSubscribed={newSubscribe ? true : false}
      ></Services>
    </div>
  );
};

export default Service;

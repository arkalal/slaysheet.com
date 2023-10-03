import React from "react";
import Services from "../../../../../components/Services/Services";
import subscribedData from "../../../../../utils/subscribedData";

const Service = async () => {
  // const data = await subscribedData();

  return (
    <div>
      <Services
      // subscribedId={data && data?._id}
      // isSubscribed={data && data ? true : false}
      ></Services>
    </div>
  );
};

export default Service;

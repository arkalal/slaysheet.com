import React from "react";
import Services from "../../../../../components/Services/Services";
import axios from "../../../../../axios/getApi";

const getWebhook = async () => {
  const res = await axios.get("webhook");
  return res.data;
};

const Service = async () => {
  const webhook = await getWebhook();
  console.log("webhook", webhook);

  return (
    <div>
      <Services
      // subscribedId={data && data?._id}
      // isSubscribed={webhook ? true : false}
      ></Services>
    </div>
  );
};

export default Service;

import React from "react";
import Test from "../../../components/Test/Test";
import axios from "../../../axios/getApi";

const getTopics = async () => {
  try {
    const response = await axios.get("topics");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Testing = async () => {
  const data = await getTopics();

  return (
    <div>
      <Test apiData={data}></Test>
    </div>
  );
};

export default Testing;

import React from "react";
import axios from "../../../../axios/getApi";
import EditTesting from "../../../../components/Test/EditTesting/EditTesting";

const getTopicById = async (id) => {
  try {
    const res = await axios.get(`topics/${id}`);

    if (res.status !== 200) {
      throw new Error("failed to fetch topic");
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const EditTest = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;

  return (
    <div>
      <EditTesting
        title={title}
        description={description}
        id={id}
      ></EditTesting>
    </div>
  );
};

export default EditTest;

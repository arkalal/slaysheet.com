"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "../../../axios/getApi";

const EditTesting = ({ id, title, description }) => {
  const [Description, setDescription] = useState(description);
  const [Title, setTitle] = useState(title);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: Title,
      description: Description,
    };

    try {
      const res = await axios.put(`topics/${id}`, data);

      console.log(res.status);

      if (!res.status === 200) {
        throw new Error("failed to update topics");
      }

      router.push("/testing");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">Enter Title</label>
        <input
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />

        <br />

        <label htmlFor="">Enter Description</label>
        <input
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />

        <br />

        <button type="submit">Edit Topic</button>
      </form>
    </div>
  );
};

export default EditTesting;

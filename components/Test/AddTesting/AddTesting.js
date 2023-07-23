"use client";

import React, { useState } from "react";
import axios from "../../../axios/getApi";
import { useRouter } from "next/navigation";

const AddTesting = () => {
  const [Description, setDescription] = useState("");
  const [Title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: Title,
      description: Description,
    };

    if (!Title || !Description) {
      alert("title and description required");
      return;
    }

    try {
      const res = await axios.post("topics", data);
      console.log(res.status);

      if (res.status === 201) {
        router.push("/testing");
      } else {
        throw new Error("Failed to create topic");
      }
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

        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
};

export default AddTesting;

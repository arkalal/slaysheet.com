"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../axios/openAiApi";
import normalAxios from "../../../../axios/getApi";

const Services = ({ isSubscribed }) => {
  const [messages, setMessages] = useState([]);
  const [Content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userMessage = {
        role: "user",
        content: Content,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("conversation", {
        messages: newMessages,
      });
      setMessages((prev) => [...prev, userMessage, response.data]);

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  const manageSubscription = async (e) => {
    e.preventDefault();

    try {
      const res = await normalAxios.get("stripe");
      router.push(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h5>Hello </h5>
      {isSubscribed ? (
        <>
          {" "}
          <h3>Welcome to Premium Content!!</h3>{" "}
        </>
      ) : (
        <>
          {" "}
          <h3>Please pay us to access premium features</h3>{" "}
        </>
      )}

      <form onSubmit={handleSubmit} action="">
        <input onChange={(e) => setContent(e.target.value)} type="text" />
        <button type="submit">Generate</button>
      </form>
      <br />

      <div>
        {" "}
        {messages.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.content}</p>
            </div>
          );
        })}{" "}
      </div>

      <br />
      {isSubscribed && (
        <>
          <button onClick={manageSubscription}>Manage Subscription</button>
        </>
      )}
    </div>
  );
};

export default Services;

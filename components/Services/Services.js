"use client";

import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "../../axios/openAiApi";

const Services = ({ stripeWebhookData }) => {
  const [messages, setMessages] = useState([]);
  const [Content, setContent] = useState("");

  console.log("stripeWebhookData", stripeWebhookData);

  const { data: session, status } = useSession();

  console.log(session?.user.email);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userMessage = {
        role: "user",
        content: Content,
      };

      const newMessages = [...messages, userMessage];

      if (session.user) {
        const response = await axios.post("conversation", {
          messages: newMessages,
        });
        setMessages((prev) => [...prev, userMessage, response.data]);
      }

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <h5>Hello {session?.user.name} </h5>

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
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default Services;

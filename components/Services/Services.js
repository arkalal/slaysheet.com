"use client";

import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "../../axios/openAiApi";

const Services = () => {
  const [messages, setMessages] = useState([]);
  const [Content, setContent] = useState("");

  const { data: session, status } = useSession();

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

  // const handleCancelSubscription = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.delete(`webhook?id=${subscribedId}`);
  //     router.refresh();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h5>Hello {session?.user.name} </h5>
      {/* {isSubscribed ? (
        <>
          {" "}
          <h3>Welcome to Premium Content!!</h3>{" "}
        </>
      ) : (
        <>
          {" "}
          <h3>Please pay us to access premium features</h3>{" "}
        </>
      )} */}

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
      {/* {isSubscribed && (
        <>
          <button onClick={handleCancelSubscription}>
            Cancel Subscription
          </button>
        </>
      )} */}
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default Services;

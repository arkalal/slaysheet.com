"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "../../axios/getApi";

const Test = ({ apiData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [router, session, status]);

  console.log(apiData);

  const deleteTopic = async (id) => {
    const res = await axios.delete(`topics?id=${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div>
      <button>
        {" "}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          href="/testing/addTest"
        >
          Add Topics
        </Link>{" "}
      </button>{" "}
      {apiData.topics.map((item, index) => {
        return (
          <div key={index}>
            {" "}
            {item.userId === session?.user.email && (
              <div style={{ marginBottom: "80px" }}>
                <h2> {item.title} </h2>
                <p> {item.description} </p>

                <button onClick={() => deleteTopic(item._id)}>Delete</button>
                <button>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/editTest/${item._id}`}
                  >
                    UpdateTopic
                  </Link>
                </button>
              </div>
            )}{" "}
          </div>
        );
      })}{" "}
    </div>
  );
};

export default Test;

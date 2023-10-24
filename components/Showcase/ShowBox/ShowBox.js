"use client";

import React, { useEffect } from "react";

const ShowBox = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedButtonId = localStorage.getItem("buttonId");
      console.log("selectedButtonId", selectedButtonId);
    }
  }, []);

  return <div>ShowBox</div>;
};

export default ShowBox;

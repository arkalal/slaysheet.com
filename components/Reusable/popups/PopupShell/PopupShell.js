"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PurchasedTokens from "../PurchasedTokens/PurchasedTokens";

const PopupShell = ({ isToken }) => {
  const [IsPopup, setIsPopup] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const closedPopup = localStorage.getItem("checkClosePop");

    if (closedPopup) {
      setIsPopup(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("checkClosePop", true);
    setIsPopup(false);
  };

  return (
    <div>
      {" "}
      {session && IsPopup && isToken && (
        <>
          {" "}
          <PurchasedTokens handleClose={handleClose} />{" "}
        </>
      )}
    </div>
  );
};

export default PopupShell;

import React from "react";
import Home from "../../components/Screens/HomeScreen/Home/Home";
import checkTokenPurchase from "../../utils/checkTokenPurchase";

const Main = async () => {
  const isToken = await checkTokenPurchase();

  return (
    <div>
      <Home isToken={isToken} />
    </div>
  );
};

export default Main;

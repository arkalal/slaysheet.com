import React from "react";
import Home from "../../components/Screens/HomeScreen/Home/Home";
import checkTokenPurchase from "../../utils/checkTokenPurchase";
import Spinner from "../../components/Reusable/Spinner/Spinner";

const Main = async () => {
  const isToken = await checkTokenPurchase();

  return (
    <div>
      <Home isToken={isToken} />
    </div>
  );
};

export default Main;

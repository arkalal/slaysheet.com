import React, { Suspense, lazy } from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import ReduxProvider from "../../../../redux/ReduxProvider";
import PurchasedTokens from "../../../Reusable/popups/PurchasedTokens/PurchasedTokens";
import axios from "../../../../axios/getApi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Banner = lazy(() => import("../Banner/Banner"));
const Showcase = lazy(() => import("../../../Showcase/Showcase"));
const ShowBox = lazy(() => import("../../../Showcase/ShowBox/ShowBox"));

const getRegisteredUser = async () => {
  try {
    const userSession = await getServerSession(authOptions);
    const res = axios.get("register");
    const userData = res.data.user;

    const currentUser = userData.filter(
      (item) => item.email === userSession.user.email
    );

    return currentUser[0];
  } catch (error) {
    console.log(error);
  }
};

const Home = async ({ isToken }) => {
  const currentUser = await getRegisteredUser();

  return (
    <div className={styles.home}>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
        <Showcase />

        <ReduxProvider>
          <ShowBox />
        </ReduxProvider>

        {isToken && (
          <>
            {" "}
            <PurchasedTokens />{" "}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Home;

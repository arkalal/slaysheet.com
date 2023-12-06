import React, { Suspense, lazy } from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import ReduxProvider from "../../../../redux/ReduxProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Banner = lazy(() => import("../Banner/Banner"));
const Showcase = lazy(() => import("../../../Showcase/Showcase"));
const ShowBox = lazy(() => import("../../../Showcase/ShowBox/ShowBox"));

const Home = async ({ isToken }) => {
  console.log("isToken", isToken);

  const userSession = await getServerSession(authOptions);

  return (
    <div className={styles.home}>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
        <Showcase />

        <ReduxProvider>
          <ShowBox />
        </ReduxProvider>

        {isToken && userSession && (
          <>
            {" "}
            <h2>Purchased Tokens</h2>{" "}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Home;

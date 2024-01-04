import React, { Suspense, lazy } from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import ReduxProvider from "../../../../redux/ReduxProvider";
import PurchasedTokens from "../../../Reusable/popups/PurchasedTokens/PurchasedTokens";
import checkFreeTokens from "../../../../utils/checkFreeTokens";
import AITokenWallet from "../../../Reusable/AITokenWallet/AITokenWallet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "../../../Footer/Footer";

const Banner = lazy(() => import("../Banner/Banner"));
const Showcase = lazy(() => import("../../../Showcase/Showcase"));
const ShowBox = lazy(() => import("../../../Showcase/ShowBox/ShowBox"));

const Home = async ({ isToken }) => {
  const userFreeTokens = await checkFreeTokens();
  const userSession = await getServerSession(authOptions);

  return (
    <div className={styles.home}>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
        <Showcase />

        {userSession && (
          <>
            <ReduxProvider>
              <AITokenWallet />
            </ReduxProvider>
          </>
        )}

        <ReduxProvider>
          <ShowBox />
        </ReduxProvider>

        {isToken && (
          <>
            <ReduxProvider>
              <PurchasedTokens />
            </ReduxProvider>
          </>
        )}

        {userFreeTokens && (
          <>
            <ReduxProvider>
              <PurchasedTokens isFree={true} />
            </ReduxProvider>
          </>
        )}
      </Suspense>

      <Footer />
    </div>
  );
};

export default Home;

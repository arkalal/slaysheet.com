import React from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import ReduxProvider from "../../../../redux/ReduxProvider";
import Banner from "../Banner/Banner";
import Showcase from "../../../Showcase/Showcase";
import ShowBox from "../../../Showcase/ShowBox/ShowBox";

const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Banner />
      <Showcase />

      <ReduxProvider>
        <ShowBox />
      </ReduxProvider>
    </div>
  );
};

export default Home;

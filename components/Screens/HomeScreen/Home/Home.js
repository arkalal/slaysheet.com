import React from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Showcase from "../../../Showcase/Showcase";

const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Banner />
      <Showcase />
    </div>
  );
};

export default Home;

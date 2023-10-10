import React from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Banner />
    </div>
  );
};

export default Home;

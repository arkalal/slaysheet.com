import React from "react";
import styles from "./Banner.module.scss";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerStatement}>
        <span>Lorem, ipsum.</span>
        <span>Lorem ipsum dolor sit amet.</span>
        <button>Get Early Access</button>
      </div>

      <div className={styles.bannerIntro}>
        <div className={styles.bannerTitle}>
          <h1>Lorem ipsum dolor sit.</h1>
        </div>

        <div className={styles.bannerDesc}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit autem
            eveniet ullam maxime ex quis eos, totam nobis ipsa eum?Lorem
          </p>
        </div>

        <div className={styles.bannerAiChatbox}>
          <AiChatbox />
        </div>
      </div>
    </div>
  );
};

export default Banner;

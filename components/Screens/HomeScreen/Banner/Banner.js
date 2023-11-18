import React from "react";
import styles from "./Banner.module.scss";
import TypingText from "../../../Reusable/TypingText/TypingText";
import BannerCard from "../../../Reusable/BannerCard/BannerCard";
import SmallAnime from "../../../Reusable/SmallAnime/SmallAnime";
import {
  bannerCardData,
  serviceTopicsData,
  titleTypewriterText,
} from "../../../../customData/data";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerStatement}>
        <span>Hello Users 🚀</span>
        <span>Welcome to your new AI Platform!</span>
        <button>Start Tour 🤖</button>
      </div>

      <div className={styles.bannerIntro}>
        <div className={styles.bannerTitle}>
          <TypingText isBannerTitle={true} typingData={titleTypewriterText} />
        </div>

        <div className={styles.bannerCard}>
          <div className={styles.bannerCards}>
            {bannerCardData.length > 0 &&
              bannerCardData.map((item, index) => {
                return (
                  <>
                    <div key={index} className={styles.smallBannerCards}>
                      <BannerCard data={item.bannerAnime} />
                    </div>
                  </>
                );
              })}
          </div>

          <div className={styles.bannerServices}>
            {serviceTopicsData.map((item, index) => {
              return (
                <>
                  <div key={index} className={styles.serviceTopics}>
                    <SmallAnime data={item.animeIcon} />
                    <h1> {item.title} </h1>
                    <p>{item.desc}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

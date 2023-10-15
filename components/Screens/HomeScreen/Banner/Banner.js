import React from "react";
import styles from "./Banner.module.scss";
import AiChatbox from "../../../Reusable/AiChatbox/AiChatbox";
import TypingText from "../../../Reusable/TypingText/TypingText";
import BannerCard from "../../../Reusable/BannerCard/BannerCard";
import animeData from "../../../../LottieAnimation/animation_lnptl8eo.json";
import animeData1 from "../../../../LottieAnimation/animation_lnq7m5rs.json";
import animeData2 from "../../../../LottieAnimation/animation_lnq7rp42.json";
import SmallAnime from "../../../Reusable/SmallAnime/SmallAnime";
import scanPdfAnime from "../../../../LottieAnimation/scanPdf.json";
import chatAIAnime from "../../../../LottieAnimation/talk AI.json";
import generateImageAnime from "../../../../LottieAnimation/AI Images.json";
import AIEmailsAnime from "../../../../LottieAnimation/Email AI.json";

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
          <TypingText />
        </div>

        <div className={styles.bannerCard}>
          <div className={styles.bannerCards}>
            <div className={styles.smallBannerCards}>
              <BannerCard data={animeData} />
            </div>

            <div className={styles.smallBannerCards}>
              <BannerCard data={animeData1} />
            </div>

            <div className={styles.smallBannerCards}>
              <BannerCard data={animeData2} />
            </div>
          </div>

          <div className={styles.bannerServices}>
            <div className={styles.serviceTopics}>
              <SmallAnime data={scanPdfAnime} />
              <h1>Chat with PDF</h1>
              <p>
                Improve your productivity on your research by the AI ability of
                chatting with your own pdf. Upload your own pdf on our platform
                and ask any questions. Our AI tool will do the research and
                answer all your questions regarding your document within a
                second!
              </p>
            </div>

            <div className={styles.serviceTopics}>
              <SmallAnime data={AIEmailsAnime} />
              <h1>Help AI write your Emails</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                odit nulla aliquam corporis eligendi sint.
              </p>
            </div>

            <div className={styles.serviceTopics}>
              <SmallAnime data={generateImageAnime} />
              <h1>Generate Creative Images</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                odit nulla aliquam corporis eligendi sint.
              </p>
            </div>

            <div className={styles.serviceTopics}>
              <SmallAnime data={chatAIAnime} />
              <h1>Advanced Communication with AI</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                odit nulla aliquam corporis eligendi sint.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bannerAiChatbox}>
          <AiChatbox />
        </div>
      </div>
    </div>
  );
};

export default Banner;

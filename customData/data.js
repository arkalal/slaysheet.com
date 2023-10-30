import animeData from "../LottieAnimation/animation_lnptl8eo.json";
import animeData1 from "../LottieAnimation/animation_lnq7m5rs.json";
import scanPdfAnime from "../LottieAnimation/scanPdf.json";
import AIEmailsAnime from "../LottieAnimation/Email AI.json";
import generateImageAnime from "../LottieAnimation/AI Images.json";
import chatAIAnime from "../LottieAnimation/talk AI.json";

export const bannerCardData = [
  { bannerAnime: animeData },
  { bannerAnime: animeData1 },
];

export const serviceTopicsData = [
  {
    animeIcon: scanPdfAnime,
    title: "Chat with PDF",
    desc: "Improve your productivity on your research by the AI ability of chatting with your own pdf. Upload your own pdf on our platformand ask any questions. Our AI tool will do the research and answer all your questions regarding your document within a second!",
  },
  {
    animeIcon: AIEmailsAnime,
    title: "Help AI write your Emails",
    desc: "Just say what kind of emails you need your AI to write for you and get your advnaced personal or professional email exactly the way you want within a second.",
  },
  {
    animeIcon: generateImageAnime,
    title: "Generate Creative Images",
    desc: "Bring your creative imaginations to life without being an artist. Just instruct the AI to generate creative graphical images for you based on your text.",
  },
  {
    animeIcon: chatAIAnime,
    title: "Advanced Communication with AI",
    desc: "Talk to your own AI chatbot just like a human. Upload any screenshot or images it will help to solve your problems like a real guide.",
  },
];

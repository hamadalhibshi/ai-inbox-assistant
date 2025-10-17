import logo from "../assets/logo.png";
import heroLogo from "../assets/heroLogo.png";
import tutorialOne from "../assets/tutorialOne.png";
import tutorialTwo from "../assets/tutorialTwo.png";
import tutorialThree from "../assets/tutorialThree.png";

export const images = {
  logo: logo,
  heroLogo: heroLogo,
  tutorialOne: tutorialOne,
  tutorialTwo: tutorialTwo,
  tutorialThree: tutorialThree,
};

export const tutorialData = [
  {
    id: 0,
    title: "Get Started Instantly",
    desc: "Open the AI Inbox Assistant from any device and start organizing your messages in seconds.",
    image: tutorialOne,
  },
  {
    id: 1,
    title: "Paste Your Message or Email",
    desc: "Simply copy and paste your chat, email, or conversation into the chatbox — no formatting needed.",
    image: tutorialTwo,
  },
  {
    id: 2,
    title: "Let AI Handle the Rest",
    desc: "The AI Inbox Assistant will analyze, summarize, and structure your message automatically for you.",
    image: tutorialThree,
  },
];

export const channels = {
  whatsapp: "Whatsapp",
  sms: "SMS",
  email: "Email",
  chat: "Chat",
  unknown: "Unknown",
};

export const priorities = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const status = {
  open: "Open",
  closed: "Closed",
};

export const language = {
  en: "en",
  ar: "ar",
};

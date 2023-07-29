import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  },
});

export default instance;

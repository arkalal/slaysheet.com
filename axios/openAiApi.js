import axios from "axios";
import { baseURL } from "./baseUrl";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  },
});

export default instance;

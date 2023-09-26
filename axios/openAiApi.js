import axios from "axios";
import { baseUrlTest } from "./baseUrl";

const instance = axios.create({
  baseURL: `${baseUrlTest}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  },
});

export default instance;

import axios from "axios";
import { baseUrlStaging, baseUrlTest } from "./baseUrl";

const instance = axios.create({
  baseURL: `${baseUrlStaging}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  },
});

export default instance;

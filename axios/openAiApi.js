import axios from "axios";
import { baseUrlProd, baseUrlStaging, baseUrlTest } from "./baseUrl";
import { openAiApiKey } from "./constant";

const instance = axios.create({
  baseURL: `${baseUrlProd}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openAiApiKey}`,
  },
});

export default instance;

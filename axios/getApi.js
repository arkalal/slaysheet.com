import axios from "axios";
import { baseUrlProd, baseUrlStaging, baseUrlTest } from "./baseUrl";

const instance = axios.create({
  baseURL: `${baseUrlStaging}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

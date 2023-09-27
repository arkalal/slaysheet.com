import axios from "axios";
import { baseUrlTest } from "./baseUrl";

const instance = axios.create({
  baseURL: `${baseUrlTest}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

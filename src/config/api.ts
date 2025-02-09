import axios from "axios";
import { env } from "./env";

export const API = axios.create({
   baseURL: env.BASE_URL
})
import axios from "axios";

const baseURL = "https://back-end-four-park.vercel.app/";
export const client = axios.create({
  baseURL,
  headers: { "ngrok-skip-browser-warning": "any" },
});

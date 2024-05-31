import axios from "axios";

const baseURL = "http://localhost:3000";
export const client = axios.create({
  baseURL,
  headers: { "ngrok-skip-browser-warning": "any" },
});

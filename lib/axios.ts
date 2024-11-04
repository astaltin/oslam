import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const api = axios.create({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: { "Content-Type": "application/json" },
});

export { api };

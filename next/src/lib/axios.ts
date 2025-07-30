import axios, { type AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "não leu direito",
});

let cachedSession: Session | null = null;

api.interceptors.request.use(
  async (config) => {
    if (!cachedSession) {
      cachedSession = await getSession();
    }

    if (cachedSession?.accessToken) {
      config.headers.Authorization = `Bearer ${cachedSession.accessToken}`;
    }

    console.log(
      `[${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`,
      config.data || ""
    );

    // console.log(`[Headers] `, config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "SESSION_INVALIDATED"
    ) {
      cachedSession = null;
      signOut({ callbackUrl: "/login" });
    }
    return Promise.reject(error);
  }
);
(api as AxiosInstance & { clearSessionCache: () => void }).clearSessionCache =
  () => {
    cachedSession = null;
  };

export const useAPI = () => {
  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      "não leu direito",
  });

  instance.interceptors.request.use(
    async (config) => {
      if (!cachedSession) {
        cachedSession = await getSession();
      }

      if (cachedSession?.accessToken) {
        config.headers.Authorization = `Bearer ${cachedSession.accessToken}`;
      }

      console.log(
        `[${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`,
        config.data || ""
      );

      console.log(`[Headers] `, config.headers);

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.data?.code === "SESSION_INVALIDATED"
      ) {
        cachedSession = null;
        signOut({ callbackUrl: "/login" });
      }
      return Promise.reject(error);
    }
  );

  (
    instance as AxiosInstance & { clearSessionCache: () => void }
  ).clearSessionCache = () => {
    cachedSession = null;
  };

  console.log(`API URL: ${process.env.API_URL}`);
  console.log(`NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`);
  console.log(`INSTANCE URL: ${api.defaults.baseURL}`);

  console.log("[useAPI] USOU O HOOK");

  return instance as AxiosInstance & { clearSessionCache: () => void };
};

console.log(`API URL: ${process.env.API_URL}`);
console.log(`NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`);
console.log(`INSTANCE URL: ${api.defaults.baseURL}`);

export default api as AxiosInstance & { clearSessionCache: () => void };

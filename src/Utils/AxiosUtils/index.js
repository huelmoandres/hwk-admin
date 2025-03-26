import axios from "axios";
import getCookie from "../CustomFunctions/GetCookie";
import Cookies from "js-cookie";

// Función para limpiar la sesión
const clearSession = (router) => {
  try {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    if (router) {
      router.push("/auth/login");
    }
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};

const client = axios.create({
  baseURL: process.env.API_PROD_URL,
  headers: {
    Accept: "application/json",
  },
});

const clientV1 = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const request = async ({ ...options }, router) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 401) {
      clearSession(router);
    }
    return error;
  };
  try {
    const response = await client(options);
    return onSuccess(response.data);
  } catch (error) {
    return onError(error);
  }
};

export const requestV1 = async ({ ...options }, router, completeData = false) => {
  try {
    const response = await clientV1(options);
    if (completeData) {
      return response;
    }
    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      clearSession(router);
    }
    throw error;
  }
};

export default request;

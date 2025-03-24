import axios from "axios";
import getCookie from "../CustomFunctions/GetCookie";
import Cookies from "js-cookie";

// Función para limpiar la sesión
const clearSession = (router) => {
  try {
    Cookies.remove("uat");
    Cookies.remove("ue");
    Cookies.remove("account");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.clear();
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
  client.defaults.headers.common.Authorization = `Bearer ${getCookie("uat")}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 401) {
      Cookies.remove("uat");
      Cookies.remove("ue");
      Cookies.remove("account");
      localStorage.clear();
      router && router.push("/auth/login");
    }
    return error;
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const requestV1 = async ({ ...options }, router) => {
  try {
    const response = await clientV1(options);
    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      clearSession(router);
    }
    throw error;
  }
};

export default request;

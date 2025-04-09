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
  baseURL: process.env.API_PROD_URL_V1,
  headers: {
    Accept: "application/json",
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
    const isFormData = options?.data instanceof FormData;

    const headers = {
      Accept: "application/json",
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" } // ← Aquí lo forzás
        : { "Content-Type": "application/json" }),
      ...options.headers, // permitir sobrescritura manual si se desea
    };

    const response = await clientV1({
      ...options,
      headers,
    });

    return completeData ? response : response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      console.log("acarouter",error )
      clearSession(router);
    }
    throw error;
  }
};

export default request;

import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: process.env.API_PROD_URL,
  headers: {
    Accept: "application/json",
  },
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

const clientV1 = axios.create({
  baseURL: process.env.API_PROD_URL_V1,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

clientV1.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      !window.location.pathname.includes('/auth/login')) {
      await clearSession();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const requestV1 = async ({ ...options }, router, completeData = false) => {
  try {
    const isFormData = options?.data instanceof FormData;

    const headers = {
      Accept: "application/json",
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...options.headers,
    };

    const response = await clientV1({
      ...options,
      headers,
    });

    return completeData ? response : response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      await clearSession(router);
      return null;
    }

    throw error;
  }
};

export const clearSession = async (router) => {
  try {
    await clientV1.post('/auth/logout', {}, { withCredentials: true });
    if (router) {
      router.push("/auth/login");
    } else if (typeof window !== 'undefined') {
      window.location.href = "/auth/login";
    }
  } catch (error) {
    console.log(error);
  }
};

export default request;

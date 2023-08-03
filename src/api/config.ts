import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/userSlice/userSlice";
const baseURL = import.meta.env.VITE_SERVER_URL as string;

interface ErrorData {
  message: string;
}

interface ResponseData {
  message: string;
  accessToken: string;
}

const axiosAuthorized: AxiosInstance = axios.create({
  baseURL: baseURL,
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

axiosAuthorized.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

axiosAuthorized.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest: AxiosRequestConfig<unknown> | undefined =
      error.config;
    if (
      error?.response?.status === 403 &&
      (error.response.data as ErrorData)?.message ===
        "Access forbidden, Invalid token"
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        return axiosInstance
          .post<ResponseData>("/refresh/token", null, {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("refreshToken") as string
              }`,
            },
          })
          .then((response: AxiosResponse) => {
            const responseData = response.data as ResponseData;
            const accessToken = responseData?.accessToken;
            localStorage.setItem("accessToken", accessToken);
            if (originalRequest && originalRequest.headers) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${accessToken}`;
            }
            isRefreshing = false;
            return axiosAuthorized(originalRequest!);
          })
          .catch((error) => {
            store.dispatch(logout());
            isRefreshing = false;
            return Promise.reject(error);
          });
      } else {
        store.dispatch(logout());
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(interval);
              resolve(axiosAuthorized(originalRequest!));
            }
          }, 100);
        });
      }
    }
    return Promise.reject(error);
  }
);

export { axiosAuthorized, axiosInstance };

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_URL,
});

//Parse the token and store it in session storage
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
export default axiosInstance;

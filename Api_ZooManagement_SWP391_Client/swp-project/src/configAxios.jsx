import { Token } from "@mui/icons-material";
import axiosBase from "axios";
import redis from "redis";

// Tạo một client Redis
const redisClient = redis.createClient();
const rediskey = "your_redis_key"; // Thay thế bằng khóa thực tế

// Hàm để lấy access token mới
async function refreshAccessToken() {
  // Triển khai logic lấy access token mới, ví dụ:
  const newToken = JSON.parse(localStorage.getItem("token")); // Thay thế bằng logic lấy access token mới
  return newToken;
}

const axiosApiInstance = axiosBase.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    // Lấy giá trị từ Redis
    const value = await new Promise((resolve, reject) => {
      redisClient.get(rediskey, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const keys = JSON.parse(value);
    config.headers = {
      Authorization: `Bearer ${keys.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi hàm refreshAccessToken để lấy access token mới
        const access_token = await refreshAccessToken();
        // Cập nhật Authorization header với access token mới
        originalRequest.headers["Authorization"] = "Bearer " + access_token;
        // Gọi lại axiosApiInstance với request ban đầu
        return axiosApiInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Sử dụng axiosApiInstance để thực hiện các cuộc gọi API
axiosApiInstance
  .get("/your/api/endpoint")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

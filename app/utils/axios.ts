import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Change to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for requests and responses
axiosInstance.interceptors.request.use(
  config => {
    // You can add auth tokens here if needed
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default axiosInstance;
import axios from 'axios';

const axiosPipelineInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PIPELINE_API_URL, // Pipeline API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed
axiosPipelineInstance.interceptors.request.use(
  config => {
    // Add pipeline-specific auth or logic here
    return config;
  },
  error => Promise.reject(error)
);

axiosPipelineInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default axiosPipelineInstance;
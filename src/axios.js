import axios from 'axios';

// https://api-pet-adoption.vercel.app/api

export const urlPath =   import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:4000"

const axiosInstance = axios.create({
  baseURL: `${urlPath}/api`, // Base URL for all requests
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const STATIC_PATH = urlPath+"/"

export default axiosInstance;
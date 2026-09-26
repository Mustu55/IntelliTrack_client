import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || "/api/v4",
  headers: {
    "Content-Type": "application/json",
    "X-CJIS-Enclave": "FIPS-140-3-LEVEL-3"
  },
  timeout: 1e4
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("intellitrack_token") || "AUTH_RSA_EXP_ACTIVE";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
async function simulateNetworkDelay(data, delayMs = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
export {
  apiClient,
  simulateNetworkDelay
};

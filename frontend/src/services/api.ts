import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await api.post("/auth/refresh-token");
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  verifyEmail: (data: { code: string }) => api.post("/auth/verify-email", data),

  resendVerificationCode: (data: { email: string }) =>
    api.post("/auth/resend-verification", data),

  forgotPassword: (data: { email: string }) =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data: { token: string; newPassword: string }) =>
    api.post("/auth/reset-password", data),

  getCurrentUser: () => api.get("/auth/me"),

  updateProfile: (data: { name: string }) => api.patch("/auth/profile", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch("/auth/change-password", data),

  deleteAccount: (data: { password: string }) =>
    api.delete("/auth/delete-account", { data }),
};
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authAPI } from "../services/api";
// import { useAuthStore } from "../store/authStore";
// import showToast from "../utils/toast";
// import { AxiosError } from "axios";

// interface ErrorResponse {
//   message: string;
// }

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const { setUser, setAccessToken, logout: clearAuth } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleError = (error: unknown) => {
//     if (error instanceof AxiosError) {
//       const message =
//         (error.response?.data as ErrorResponse)?.message ||
//         "Something went wrong";
//       showToast.error(message);
//     } else {
//       showToast.error("An unexpected error occurred");
//     }
//   };

//   const register = async (data: {
//     name: string;
//     email: string;
//     password: string;
//   }) => {
//     try {
//       setIsLoading(true);
//       const response = await authAPI.register(data);
//       const { user, accessToken } = response.data.data;
      
//       setUser(user);
//       setAccessToken(accessToken);
      
//       showToast.success("Registration successful! Please verify your email.");
//       navigate("/verify-email");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (data: { email: string; password: string }) => {
//     try {
//       setIsLoading(true);
//       const response = await authAPI.login(data);
//       const { user, accessToken } = response.data.data;
      
//       setUser(user);
//       setAccessToken(accessToken);
      
//       showToast.success("Login successful!");
      
//       if (!user.isVerified) {
//         navigate("/verify-email");
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       setIsLoading(true);
//       await authAPI.logout();
//       clearAuth();
//       showToast.success("Logged out successfully");
//       navigate("/sign-in");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyEmail = async (code: string) => {
//     try {
//       setIsLoading(true);
//       const response = await authAPI.verifyEmail({ code });
//       const { user } = response.data.data;
      
//       setUser(user);
//       showToast.success("Email verified successfully!");
//       navigate("/dashboard");
//     } catch (error) {
//       handleError(error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resendVerificationCode = async (email: string) => {
//     try {
//       setIsLoading(true);
//       await authAPI.resendVerificationCode({ email });
//       showToast.success("Verification code sent! Check your email.");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const forgotPassword = async (email: string) => {
//     try {
//       setIsLoading(true);
//       await authAPI.forgotPassword({ email });
//       showToast.success("Password reset link sent to your email!");
//       navigate("/sign-in");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetPassword = async (token: string, newPassword: string) => {
//     try {
//       setIsLoading(true);
//       await authAPI.resetPassword({ token, newPassword });
//       showToast.success("Password reset successful! Please login.");
//       navigate("/sign-in");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getCurrentUser = async () => {
//     try {
//       const response = await authAPI.getCurrentUser();
//       const { user } = response.data.data;
//       setUser(user);
//       return user;
//     } catch (error) {
//       clearAuth();
//       throw error;
//     }
//   };

//   const updateProfile = async (name: string) => {
//     try {
//       setIsLoading(true);
//       const response = await authAPI.updateProfile({ name });
//       const { user } = response.data.data;
      
//       setUser(user);
//       showToast.success("Profile updated successfully!");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changePassword = async (
//     currentPassword: string,
//     newPassword: string
//   ) => {
//     try {
//       setIsLoading(true);
//       await authAPI.changePassword({ currentPassword, newPassword });
//       showToast.success("Password changed successfully!");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteAccount = async (password: string) => {
//     try {
//       setIsLoading(true);
//       await authAPI.deleteAccount({ password });
//       clearAuth();
//       showToast.success("Account deleted successfully");
//       navigate("/sign-in");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     register,
//     login,
//     logout,
//     verifyEmail,
//     resendVerificationCode,
//     forgotPassword,
//     resetPassword,
//     getCurrentUser,
//     updateProfile,
//     changePassword,
//     deleteAccount,
//     isLoading,
//   };
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";
import { showToast } from "../utils/toast";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken, logout: clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const message =
        (error.response?.data as ErrorResponse)?.message ||
        "Something went wrong";
      showToast.error(message);
    } else {
      showToast.error("An unexpected error occurred");
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(data);
      const { user, accessToken } = response.data.data;
      
      setUser(user);
      setAccessToken(accessToken);
      
      showToast.success("Registration successful! Please verify your email.");
      navigate("/verify-email");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(data);
      const { user, accessToken } = response.data.data;
      
      setUser(user);
      setAccessToken(accessToken);
      
      showToast.success("Login successful!");
      
      if (!user.isVerified) {
        navigate("/verify-email");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      clearAuth();
      showToast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.verifyEmail({ code });
      const { user } = response.data.data;
      
      setUser(user);
      showToast.success("Email verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      setIsLoading(true);
      await authAPI.resendVerificationCode({ email });
      showToast.success("Verification code sent! Check your email.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await authAPI.forgotPassword({ email });
      showToast.success("Password reset link sent to your email!");
      navigate("/sign-in");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      await authAPI.resetPassword({ token, newPassword });
      showToast.success("Password reset successful! Please login.");
      navigate("/sign-in");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const { user } = response.data.data;
      setUser(user);
      return user;
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const updateProfile = async (name: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.updateProfile({ name });
      const { user } = response.data.data;
      
      setUser(user);
      showToast.success("Profile updated successfully!");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      setIsLoading(true);
      await authAPI.changePassword({ currentPassword, newPassword });
      showToast.success("Password changed successfully!");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (password: string) => {
    try {
      setIsLoading(true);
      await authAPI.deleteAccount({ password });
      clearAuth();
      showToast.success("Account deleted successfully");
      navigate("/sign-in");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    updateProfile,
    changePassword,
    deleteAccount,
    isLoading,
  };
};
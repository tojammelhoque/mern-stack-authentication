import * as hotToast from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

const toast = hotToast.toast;
const Toaster = hotToast.Toaster;

// Custom toast styles
const toastStyles: ToastOptions = {
  duration: 4000,
  style: {
    background: "#fff",
    color: "#363636",
    borderRadius: "10px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
};

// Toast wrapper functions
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      ...toastStyles,
      iconTheme: {
        primary: "#10b981",
        secondary: "#fff",
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      ...toastStyles,
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    });
  },
  loading: (message: string) => {
    return toast.loading(message, toastStyles);
  },
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages, toastStyles);
  },
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};

// Toaster component to be added to App
export const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 20,
      }}
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: "#fff",
          color: "#363636",
        },
      }}
    />
  );
};

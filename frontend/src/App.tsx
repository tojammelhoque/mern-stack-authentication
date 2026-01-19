import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "./utils/toast";
import { useAuthStore } from "./store/authStore";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import ResendVerificationCode from "./pages/ResendVerificationCode";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import { ProtectedRoute, PublicRoute } from "./components/auth";

function App() {
  const { isAuthenticated } = useAuthStore();
  const { getCurrentUser } = useAuth();

  // Check authentication on app load
  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser().catch(() => {});
    }
  }, [isAuthenticated, getCurrentUser]);

  return (
    <>
      <ToastContainer />
      <ToastContainer />

      <Routes>
        {/* Root path - Dashboard (protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect /dashboard to / for consistency */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* Public routes - redirect to / if authenticated */}
        <Route
          path="/sign-up"
          element={
            <PublicRoute redirectTo="/">
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PublicRoute redirectTo="/">
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute redirectTo="/">
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute redirectTo="/">
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/resend-verification-code"
          element={
            <PublicRoute redirectTo="/">
              <ResendVerificationCode />
            </PublicRoute>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute>
              <VerifyEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

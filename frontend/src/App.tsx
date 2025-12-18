import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "./utils/toast";
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

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/resend-verification-code"
            element={<ResendVerificationCode />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/common";

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <LoadingSpinner fullScreen />;
}

export default Logout;
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";
import { Button, Card, Badge, LoadingSpinner, Link } from "../components/common";
import { FiUser, FiMail, FiCalendar, FiLogOut, FiSettings } from "react-icons/fi";

function Dashboard() {
  const { user, isLoading } = useAuthStore();
  const { getCurrentUser, logout } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-gray-900">Mern Stack Authentication System</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/profile" variant="muted">
                <FiSettings size={20} />
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <FiLogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your account today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <FiUser className="text-purple-600" size={24} />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {user?.isVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <Badge variant="warning">Not Verified</Badge>
                )}
              </div>
            </div>
            <Link to="/profile">
              <Button variant="outline" fullWidth className="mt-4">
                Edit Profile
              </Button>
            </Link>
          </Card>

          {/* Account Info Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Account Info
              </h3>
              <FiMail className="text-purple-600" size={24} />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium text-gray-900">
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
              <FiCalendar className="text-purple-600" size={24} />
            </div>
            <div className="space-y-3">
              <Link to="/change-password">
                <Button variant="outline" fullWidth>
                  Change Password
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" fullWidth>
                  Account Settings
                </Button>
              </Link>
              <Button variant="danger" fullWidth onClick={logout}>
                Logout
              </Button>
            </div>
          </Card>
        </div>

        {/* Verification Alert */}
        {!user?.isVerified && (
          <div className="mt-8">
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="text-yellow-600">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    Verify Your Email
                  </h3>
                  <p className="text-sm text-yellow-800 mb-4">
                    Please verify your email address to access all features
                  </p>
                  <Link to="/verify-email">
                    <Button size="sm">Verify Now</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
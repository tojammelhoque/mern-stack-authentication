import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { Button, Card, Modal, Badge, Alert } from "../components/common";
import { PasswordInput } from "../components/auth";
import { FiSettings, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

function Settings() {
  const { user } = useAuthStore();
  const { deleteAccount, isLoading } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteAccount = async () => {
    if (!password) {
      setDeleteError("Password is required");
      return;
    }

    setDeleteError("");
    await deleteAccount(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </Link>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your account preferences
              </p>
            </div>
            <FiSettings className="text-purple-600" size={32} />
          </div>

          {/* Account Info Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">
                    {user?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="font-medium text-gray-900">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Verification Status
                  </span>
                  {user?.isVerified ? (
                    <Badge variant="success">Verified</Badge>
                  ) : (
                    <Badge variant="warning">Not Verified</Badge>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link to="/profile">
                  <Button variant="outline" fullWidth>
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/change-password">
                  <Button variant="outline" fullWidth>
                    Change Password
                  </Button>
                </Link>
                {!user?.isVerified && (
                  <Link to="/verify-email">
                    <Button variant="primary" fullWidth>
                      Verify Email
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                Danger Zone
              </h2>
              <Alert
                type="warning"
                title="Delete Account"
                message="Once you delete your account, there is no going back. Please be certain."
                className="mb-4"
              />
              <Button
                variant="danger"
                fullWidth
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setPassword("");
            setDeleteError("");
          }}
          title="Delete Account"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <FiAlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  Are you absolutely sure?
                </h3>
                <p className="text-sm text-red-800">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-4">
                Please enter your password to confirm account deletion:
              </p>
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={deleteError}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="danger"
                fullWidth
                onClick={handleDeleteAccount}
                isLoading={isLoading}
              >
                Yes, Delete My Account
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                  setDeleteError("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Settings;
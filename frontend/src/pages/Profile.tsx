import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../schemas/auth.schema";
import { Input, Button, Card, Badge } from "../components/common";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuthStore();
  const { updateProfile, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema<UpdateProfileFormData>({
    schema: updateProfileSchema,
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    await updateProfile(data.name);
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
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Update your personal information
              </p>
            </div>
            <FiUser className="text-purple-600" size={32} />
          </div>

          {/* Current Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              icon={FiUser}
              placeholder="Enter your name"
              error={errors.name?.message}
              {...register("name")}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" fullWidth isLoading={isLoading}>
                Save Changes
              </Button>
              <Link to="/dashboard" className="flex-1">
                <Button type="button" variant="outline" fullWidth>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>

          {/* Additional Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Other Actions</h3>
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
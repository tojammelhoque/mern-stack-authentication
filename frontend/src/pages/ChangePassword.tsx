import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../schemas/auth.schema";
import { Button, Card, Alert } from "../components/common";
import { PasswordInput, PasswordStrengthMeter } from "../components/auth";
import { FiLock, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function ChangePassword() {
  const { changePassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useFormWithSchema<ChangePasswordFormData>({
    schema: changePasswordSchema,
  });

  const newPassword = watch("newPassword") || "";

  const onSubmit = async (data: ChangePasswordFormData) => {
    await changePassword(data.currentPassword, data.newPassword);
    reset();
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
                Change Password
              </h1>
              <p className="text-gray-600 mt-1">
                Update your password to keep your account secure
              </p>
            </div>
            <FiLock className="text-purple-600" size={32} />
          </div>

          <Alert
            type="info"
            message="Choose a strong password that you haven't used before"
            className="mb-6"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              error={errors.currentPassword?.message}
              {...register("currentPassword")}
            />

            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />

            <PasswordStrengthMeter password={newPassword} />

            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" fullWidth isLoading={isLoading}>
                Update Password
              </Button>
              <Link to="/dashboard" className="flex-1">
                <Button type="button" variant="outline" fullWidth>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>

          {/* Security Tips */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">
              Password Security Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Use at least 6 characters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Include uppercase and lowercase letters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Include at least one number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Avoid using personal information</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ChangePassword;
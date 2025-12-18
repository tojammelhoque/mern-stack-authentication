import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/auth.schema";
import { Button, Card, CardHeader, Alert } from "../components/common";
import {
  AuthLayout,
  PasswordInput,
  PasswordStrengthMeter,
} from "../components/auth";
import { FiLock } from "react-icons/fi";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ResetPassword() {
  const { resetPassword, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormWithSchema<ResetPasswordFormData>({
    schema: resetPasswordSchema,
  });

  const newPassword = watch("newPassword") || "";

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    await resetPassword(token, data.newPassword);
  };

  if (!token) {
    return null;
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader
          title="Reset Password"
          subtitle="Enter your new password"
          icon={<FiLock size={48} className="text-purple-600" />}
        />

        <Alert
          type="warning"
          message="Choose a strong password that you haven't used before"
          className="mb-6"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" fullWidth isLoading={isLoading}>
            Reset Password
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}

export default ResetPassword;
import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/auth.schema";
import { Input, Button, Card, CardHeader, Link, Alert } from "../components/common";
import { AuthLayout } from "../components/auth";
import { FiMail, FiLock } from "react-icons/fi";

function ForgotPassword() {
  const { forgotPassword, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema<ForgotPasswordFormData>({
    schema: forgotPasswordSchema,
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data.email);
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader
          title="Forgot Password?"
          subtitle="No worries, we'll send you reset instructions"
          icon={<FiLock size={48} className="text-purple-600" />}
        />

        <Alert
          type="info"
          message="Enter your email and we'll send you a link to reset your password"
          className="mb-6"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={FiMail}
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password? <Link to="/sign-in">Sign in</Link>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default ForgotPassword;
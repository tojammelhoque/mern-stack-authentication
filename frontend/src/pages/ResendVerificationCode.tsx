import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import {
  resendVerificationSchema,
  type ResendVerificationFormData,
} from "../schemas/auth.schema";
import {
  Input,
  Button,
  Card,
  CardHeader,
  Link,
  Alert,
} from "../components/common";
import { AuthLayout } from "../components/auth";
import { FiMail } from "react-icons/fi";

function ResendVerificationCode() {
  const { resendVerificationCode, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema<ResendVerificationFormData>({
    schema: resendVerificationSchema,
  });

  const onSubmit = async (data: ResendVerificationFormData) => {
    await resendVerificationCode(data.email);
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader
          title="Resend Verification Code"
          subtitle="We'll send you a new verification code"
          icon={<FiMail size={48} className="text-purple-600" />}
        />

        <Alert
          type="info"
          message="Enter your email address to receive a new verification code"
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
            Send Verification Code
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have a code? <Link to="/verify-email">Verify now</Link>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default ResendVerificationCode;

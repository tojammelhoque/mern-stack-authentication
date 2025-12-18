import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import {
  Input,
  Button,
  Card,
  CardHeader,
  Link,
  Divider,
} from "../components/common";
import { AuthLayout, PasswordInput } from "../components/auth";
import { FiMail } from "react-icons/fi";

function SignIn() {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema<LoginFormData>({
    schema: loginSchema,
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader title="Welcome Back" subtitle="Sign in to your account" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={FiMail}
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-end">
            <Link to="/forgot-password" variant="muted" className="text-sm">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <Divider />

        <div className="text-center text-sm text-gray-600">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default SignIn;

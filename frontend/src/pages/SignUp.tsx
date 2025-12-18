import { useFormWithSchema } from "../hooks/useFormWithSchema";
import { useAuth } from "../hooks/useAuth";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import {
  Input,
  Button,
  Card,
  CardHeader,
  Link,
} from "../components/common";
import {
  AuthLayout,
  PasswordInput,
  PasswordStrengthMeter,
} from "../components/auth";
import { FiMail, FiUser } from "react-icons/fi";

function SignUp() {
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormWithSchema<RegisterFormData>({
    schema: registerSchema,
  });

  const password = watch("password") || "";

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader
          title="Create Account"
          subtitle="Sign up to get started"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            icon={FiUser}
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name")}
          />

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

          <PasswordStrengthMeter password={password} />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in">Sign in</Link>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default SignUp;
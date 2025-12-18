import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { Button, Card, CardHeader, Link, Alert } from "../components/common";
import {
  AuthLayout,
  VerificationCodeInput,
  CountdownTimer,
} from "../components/auth";
import { FiMail } from "react-icons/fi";

function VerifyEmail() {
  const { verifyEmail, resendVerificationCode, isLoading } = useAuth();
  const { user } = useAuthStore();
  const [error, setError] = useState<string>("");
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (code: string) => {
    setError("");
    try {
      await verifyEmail(code);
    } catch (err) {
      setError("Invalid or expired verification code");
    }
  };

  const handleResend = async () => {
    if (!user?.email) return;

    setResendLoading(true);
    setCanResend(false);
    try {
      await resendVerificationCode(user.email);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader
          title="Verify Your Email"
          subtitle="We've sent a verification code to your email"
          icon={<FiMail size={48} className="text-purple-600" />}
        />

        {user?.email && (
          <Alert
            type="info"
            message={`Code sent to ${user.email}`}
            className="mb-6"
          />
        )}

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter the 6-digit code we sent you
            </p>
            <VerificationCodeInput
              length={6}
              onComplete={handleVerify}
              error={error}
            />
          </div>

          {!canResend && (
            <p className="text-center text-sm text-gray-600">
              Didn't receive the code? Resend in{" "}
              <CountdownTimer
                initialSeconds={60}
                onComplete={() => setCanResend(true)}
              />
            </p>
          )}

          {canResend && (
            <Button
              variant="outline"
              fullWidth
              onClick={handleResend}
              isLoading={resendLoading}
              disabled={isLoading}
            >
              Resend Verification Code
            </Button>
          )}

          <div className="text-center text-sm text-gray-600">
            Wrong email? <Link to="/sign-up">Sign up again</Link>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default VerifyEmail;
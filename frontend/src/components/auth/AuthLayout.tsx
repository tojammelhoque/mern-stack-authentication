import React, { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Your App Name</h1>
        </div>

        {children}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Your App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

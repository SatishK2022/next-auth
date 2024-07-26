"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await toast.promise(
        axios.post("/api/users/resetpassword", {
          token,
          password,
        }),
        {
          loading: "Reseting Password...",
          success: "Password Reset Successfully",
          error: "Password Reset Failed",
        }
      );

      router.push("/login");
      console.log("Password reset successful");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    setToken(token!);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

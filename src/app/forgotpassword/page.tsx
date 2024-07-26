"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        axios.post("/api/users/forgotpassword", { email }),
        {
          loading: "Sending Reset Mail...",
          success: "Reset Link Sent",
          error: "Failed to send reset mail",
        }
      );

      toast((t) => (
        <div className="flex items-center flex-col gap-4">
          <p className="font-medium">
            We've sent a reset email to your inbox.{" "}
            <span className="font-bold">Please check your email</span> and click
            the link to reset your password.
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ));

      setEmail("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-6 ">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Send Reset Link
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

export default ForgotPassword;

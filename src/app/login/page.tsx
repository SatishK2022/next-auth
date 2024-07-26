"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await toast.promise(
        axios.post("/api/users/login", user),
        {
          loading: "Logging in...",
          success: "Login Successful",
          error: "Login Failed",
        }
      );
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      toast.error("Login Failed");
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-white text-black flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your email and password to access your account.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full text-sm text-right">
              <Link
                href="/forgotpassword"
                className="font-medium hover:underline"
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full border bg-orange-500 border-orange-400 ${
                buttonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-orange-600"
              } rounded-md px-3 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer`}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Loading..." : "Log in"}
            </button>
          </div>
          <p className="text-center">
            Don't have an account yet?{" "}
            <Link
              href="/signup"
              className="text-orange-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

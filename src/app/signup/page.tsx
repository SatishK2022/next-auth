"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
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
        axios.post("/api/users/signup", user),
        {
          loading: "Signing up...",
          success: "Signup Successful",
          error: "Signup Failed",
        }
      );

      toast((t) => (
        <div className="flex items-center flex-col gap-4">
          <p className="font-medium">
            We've sent a verification email to your inbox.{" "}
            <span className="font-bold">Please check your email</span> and click
            the link to verify your account.
          </p>
          <button
            className="bg-black hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ));
      router.push("/login");
    } catch (error: any) {
      toast.error("Signup Failed");
    }
  }

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-white text-black">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm">
            Or{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              prefetch={false}
            >
              login to your existing account
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit} method="post" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                autoComplete="username"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 sm:text-sm"
              />
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
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);

    // const { query } = router;
    // const urlToken2 = query.token;
  }, []);

  //   useEffect(() => {
  //     if (token?.length > 0) {
  //       verifyUserEmail();
  //     }
  //   }, [token]);

  async function verifyUserEmail() {
    try {
      const response = await toast.promise(
        axios.post("/api/users/verifyemail", { token }),
        {
          loading: "Verifying Email...",
          success: "Email Verified Successfully",
          error: "Error Verifying Email",
        }
      );
      setIsVerified(true);
      router.push("/login");
    } catch (error: any) {
      toast.error("Error verifyiing email");
      console.log("Error verifying email", error.response.data);
      setError(true);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-white text-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We've sent a verification email to your inbox. Please check your
            email and click the link to verify your account.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => verifyUserEmail()}
            disabled={isVerified}
            className={`bg-orange-500 hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out ${
              isVerified ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ pointerEvents: isVerified ? "none" : "auto" }}
          >
            {isVerified ? "Email verified" : "Verify Email"}
          </button>
        </div>
        <div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already verified?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Login to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import { profile } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState("");
  const router = useRouter();

  async function getUser() {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function logout() {
    try {
      const response = await toast.promise(axios.get("/api/users/logout"), {
        loading: "Logging out...",
        success: "Logout Successfully",
        error: "Logout Failed",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-white text-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Profile
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            <Link href={`/profile/${user}`}>{user}</Link>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={logout}
            className="bg-orange-500 hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

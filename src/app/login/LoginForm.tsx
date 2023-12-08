"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const cookies = new Cookies();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      toast.loading("Loading...")
    } else {
      toast.dismiss();
    }
  }, [isSubmitting]);

  const handleLogin = async () => {
    setIsSubmitting(true);
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setTimeout(() => {
        toast.success("Successfully logged in!");
      }, 500);
      cookies.set("token", data.token);
      router.push("/kamar");
    } else {
      setTimeout(() => {
        toast.error("Failed to login!");
      }, 500);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg px-8 flex flex-col gap-4 w-2/5 py-12">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Username</label>
        <input
          type="text"
          placeholder="Enter your Username"
          className="border-2 rounded-lg w-full p-2"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-2 rounded-lg w-full p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="bg-[#6930B7] w-full text-white py-2 rounded-lg mt-12"
        onClick={handleLogin}
      >
        Sign In
      </button>
    </div>
  );
}

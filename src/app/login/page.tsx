"use client";

import { useState } from "react";

export default function Page() {
  const [error, setError] = useState(false);
  return (
    <div className="p-[5%] bg-[url('/login-bg.svg')] bg-no-repeat flex flex-col items-center justify-center">
      <h1 className="text-[#6930B7] mb-16 font-semibold text-center text-6xl">
        Login
      </h1>

      <div className="bg-white shadow-lg rounded-lg px-8 flex flex-col gap-4 w-2/5 py-12">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter your Username"
            className="border-2 rounded-lg w-full p-2"
          />
          
          {error ? (
            <p className="text-red-500 text-xs">Username is wrong!</p>
          ) : (
            <div className="h-4"></div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="border-2 rounded-lg w-full p-2"
          />
          {error ? (
            <p className="text-red-500 text-xs">Password is wrong!</p>
          ) : (
            <div className="h-1"></div>
          )}
        </div>

        <button className="bg-[#6930B7] w-full text-white py-2 rounded-lg mt-12">
            Sign In
        </button>

        <p className="text-[#6930B7] text-right cursor-pointer">Lupa kata sandi?</p>
      </div>
    </div>
  );
}

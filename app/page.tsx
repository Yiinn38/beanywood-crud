"use client";

import { IconCoffee, IconLock, IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { LoginBanner } from "../components/login/LoginBanner";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const stats = {
    ordersServed: 142,
    revenue: 845,
    growthPercentage: 24,
  };

  return (
    <main className="flex items-center justify-center p-10 h-screen bg-zinc-900/10">
      <div className="bg-white flex w-full max-w-5xl h-[850px] rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col justify-center p-20 w-1/2">
          <div className="flex gap-3 items-center text-2xl text-amber-950 font-extrabold mb-12">
            <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
              <IconCoffee stroke={2.5} size={28} />
            </div>
            <span>Beanywood</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Login successful");
            }}
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <IconUser size={22} stroke={1.5} />
                </div>
                <input
                  className="w-full border border-slate-200 bg-slate-50 p-3.5 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all text-slate-700 placeholder:text-slate-400"
                  type="text"
                  placeholder="Enter your username..."
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <IconLock size={22} stroke={1.5} />
                </div>
                <input
                  className="w-full border border-slate-200 bg-slate-50 p-3.5 pl-12 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all text-slate-700 placeholder:text-slate-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <IconEyeOff size={22} stroke={1.5} /> : <IconEye size={22} stroke={1.5} />}
                </button>
              </div>
            </div>

            <button className="bg-amber-700 hover:bg-amber-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-700/20 mt-4 cursor-pointer">Sign in</button>
          </form>

          <p className="text-zinc-400 text-xs mt-auto">© 2024 Beanywood. All rights reserved.</p>
        </div>

        <LoginBanner {...stats} />
      </div>
    </main>
  );
}

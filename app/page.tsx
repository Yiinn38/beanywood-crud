"use client";

import { IconCoffee, IconLock, IconUser, IconEye, IconEyeOff, IconTrendingUp } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  
  const ordersServed = 142;
  const revenue = 845;
  const growthPercentage = 24;

  return (
    <main className="flex items-center justify-center p-10 h-screen bg-zinc-900/10">
      <div className="bg-white flex w-full max-w-5xl h-[850px] rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col justify-center p-20 w-1/2">
          
          <div className="flex gap-2 items-center text-xl text-amber-950 font-bold mb-12">
            <IconCoffee stroke={2} size={32} className="text-amber-700" />
            <span>Beanywood</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form className="flex flex-col gap-5">
            
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

            <button className="bg-amber-700 hover:bg-amber-800 text-white p-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-700/20 mt-4 cursor-pointer">
              Sign in
            </button>
          </form>

          <p className="text-zinc-400 text-xs mt-auto">© 2024 Beanywood. All rights reserved.</p>
        </div>

        <div className="relative w-1/2">
          <Image src="/coffee-background.png" alt="coffee background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply"></div>

          <div className="absolute bottom-10 left-10 right-10 bg-amber-950/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                 <h3 className="font-bold text-xl">Morning Rush Hour</h3>
                 <p className="text-amber-100/70 text-sm">Today's Performance</p>
              </div>
              <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                 <IconTrendingUp size={14} />
                 {growthPercentage}%
              </div>
            </div>

            <div className="flex gap-12 mb-6">
              <div>
                <p className="text-3xl font-bold">{ordersServed}</p>
                <p className="text-amber-100/60 text-xs font-bold tracking-wider">ORDERS SERVED</p>
              </div>
              <div>
                <p className="text-3xl font-bold">${revenue}</p>
                <p className="text-amber-100/60 text-xs font-bold tracking-wider">REVENUE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

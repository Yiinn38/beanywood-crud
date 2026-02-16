"use client";

import { IconTrendingUp } from "@tabler/icons-react";
import Image from "next/image";

interface LoginBannerProps {
  ordersServed: number;
  revenue: number;
  growthPercentage: number;
}

export const LoginBanner = ({ ordersServed, revenue, growthPercentage }: LoginBannerProps) => {
  return (
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
  );
};

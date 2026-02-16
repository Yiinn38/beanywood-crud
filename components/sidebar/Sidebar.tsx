"use client";

import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";
import { IconLayoutDashboard, IconMilk, IconUsers, IconCoins, IconLogout, IconCoffee, IconUserCircle } from "@tabler/icons-react";

const routes = [
  { path: "/dashboard", text: "Dashboard", icon: IconLayoutDashboard },
  { path: "/products", text: "Products", icon: IconMilk },
  { path: "/customers", text: "Customers", icon: IconUsers },
  { path: "/sales", text: "Sales", icon: IconCoins },
];

const user = {
  name: "Cesar Romero",
  role: "Manager",
};

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-72 h-screen bg-white rounded-3xl shadow-2xl border-r border-zinc-200">
      <div className="p-6">
        <Link href="/" className="flex gap-3 items-center text-2xl text-amber-950 font-extrabold hover:opacity-80 transition-opacity">
          <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
            <IconCoffee stroke={2.5} size={28} />
          </div>
          Beanywood
        </Link>
      </div>

      <div className="flex flex-col gap-2 px-4 mt-4">
        <p className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Menu</p>
        {routes.map((route) => (
          <ActiveLink key={route.path} path={route.path} text={route.text} icon={route.icon} />
        ))}
      </div>

      <div className="mt-auto p-4">
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full text-amber-700 shadow-sm">
               <IconUserCircle stroke={2} size={24} />
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-bold text-amber-950">{user.name}</p>
              <p className="text-xs text-amber-700/70 font-medium">{user.role}</p>
            </div>

            <Link href="/" className="ml-auto text-amber-400 hover:text-amber-700 transition-colors">
              <IconLogout stroke={2} size={20} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

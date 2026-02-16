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
    <aside className="flex flex-col w-64 h-screen bg-white rounded-r-[3.75rem] py-5 shadow-2xl ">
      <Link href="/" className="flex gap-2 items-center text-2xl text-amber-950 px-6 font-bold  hover:scale-105 transition-all duration-200">
        <IconCoffee stroke={2} size={28} className="text-amber-700" />
        Beanywood
      </Link>

      <hr className="my-4 border-amber-700/30" />

      <div className="flex flex-col gap-4 px-4">
        {routes.map((route) => (
          <ActiveLink key={route.path} path={route.path} text={route.text} icon={route.icon} />
        ))}
      </div>

      <div className="mt-auto pt-6">
        <hr className="my-4 border-amber-700/30" />
        <div className="px-2 py-2">
          <div className="flex items-center gap-2">
            <IconUserCircle stroke={2} size={50} className="text-amber-700" />

            <div className="flex flex-col text-amber-700">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-md">{user.role}</p>
            </div>

            <Link href="/" className="ml-auto mr-2 text-amber-950 hover:text-amber-700 hover:scale-105 transition-all duration-200">
              <IconLogout stroke={2} size={28} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

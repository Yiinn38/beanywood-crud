"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text: string;
  icon: React.ElementType;
}

export const ActiveLink = ({ path, text, icon: Icon }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive ? "bg-amber-100 text-amber-700 shadow-sm" : "text-zinc-600 hover:bg-amber-50 hover:text-amber-700"}`}
    >
      <Icon stroke={1.8} size={22} className={`transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />

      {text}
    </Link>
  );
};

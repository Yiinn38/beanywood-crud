"use client";

import Link from "next/link";
import style from "./ActiveLink.module.css";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text: string; 
  icon: React.ElementType;
}

export const ActiveLink = ({ path, text, icon: Icon }: Props) => {
  const pathName = usePathname();

  return (
    <Link href={path} className={`${style.link} ${pathName === path && style["active-link"]} text-md text-center flex gap-2 px-4 py-4 rounded-2xl border-white/30 border`}>
      <Icon stroke={1.5} size={24} />
      {text}
    </Link>
  );
};

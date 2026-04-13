"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Doors",
    href: "/doors",
  },
  {
    label: "Bays",
    href: "/bays",
  },
  {
    label: "Trailers",
    href: "/trailers",
  },
  {
    label: "Loads",
    href: "/loads",
  },
  {
    label: "Shipments",
    href: "/shipments",
  },
  {
    label: "Workers",
    href: "/workers",
  },
  {
    label: "Jockeys",
    href: "/jockeys",
  },
  {
    label: "Yard",
    href: "/yard",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950/94 text-white">
      <header>
        <div className="flex p-4 items-center font-semibold text-sm px-4 py-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <h1 className="font-bold text-blue-500 text-3xl">O</h1>
              <nav className="flex items-center gap-4 ml-2">
                {
                  navItems.map((item, index) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`  ${
                          isActive ? "bg-blue-300 text-blue-900 py-1  px-3  rounded-md" : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })
                }
              </nav>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <p className="border py-1 px-3 rounded-md text-blue-300 cursor-pointer border-blue-300">
                MESSAGE
              </p>
              <p className="border py-1 px-3 rounded-md text-blue-300 cursor-pointer border-blue-300">
                SCAN PRO
              </p>
              <p className="border py-1 px-3 rounded-md text-blue-300 cursor-pointer">
                FTW
              </p>
              <p>{currentTime}</p>
              <p> | </p>
              <p>OPTYM</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

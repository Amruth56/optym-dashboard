"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  "Home",
  "Doors/Bays",
  "Bays",
  "Trailers",
  "Loads",
  "Shipments",
  "Workers",
  "Jockeys",
  "Yard",
  "Settings",
];

const Navbar = () => {
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
              <nav className="gap-4 flex items-center ml-2 cursor-pointer">
                {navItems.map((item, index) => (
                  <a key={index}>{item.toUpperCase()}</a>
                ))}
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

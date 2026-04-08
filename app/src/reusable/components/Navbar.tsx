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
    <div>
      <header>
        <div className="flex m-2 p-4 items-center font-semibold text-sm">
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
              <p className="border p-2 rounded-md text-blue-300 cursor-pointer">
                MESSAGE
              </p>
              <p className="border p-2 rounded-md text-blue-300 cursor-pointer">
                SCAN PRO
              </p>
              <p className="border p-2 rounded-md cursor-pointer">FTW</p>
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

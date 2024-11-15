"use client";
import Link from "next/link";
import React from "react";
import AddCharacterButton from "../AddCharacterButton";
import RandomCharacterSpinner from "../_components/RandomCharacterSpinner";
import { usePathname } from "next/navigation";

const MainNav = () => {
  const currentPath = usePathname();
  return (
    <div className="bg-red-950 p-12 font-bold text-3xl flex w-full justify-between fixed z-[99] top-0 left-0">
      <p>City of Heroes - Hardcore Toon Tracker</p>
      <div className="flex justify-start space-x-10 px-10 text-lg">
        <AddCharacterButton />
        <RandomCharacterSpinner />
      </div>
      <div className="flex space-x-8">
        <Link
          href="/"
          className={`${
            currentPath === "/"
              ? "opacity-75 cursor-default"
              : "hover:opacity-75"
          } transition-all duration-300`}
        >
          Main
        </Link>
        <Link
          href="/graveyard"
          className={`${
            currentPath === "/graveyard"
              ? "opacity-75 cursor-default"
              : "hover:opacity-75"
          } transition-all duration-300`}
        >
          Graveyard
        </Link>
      </div>
    </div>
  );
};

export default MainNav;

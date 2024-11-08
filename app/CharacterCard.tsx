"use client";
import { Character } from "@/types";
import React from "react";

const CharacterCard = ({ props }: { props: Character }) => {
  const { id, name, revives, arch, origin, level, primary, secondary } = props;
  return (
    <div
      key={id}
      className="rounded flex flex-col w-64 h-fit hover:scale-105 transition-all duration-300 border-4 border-gray-200"
    >
      <div className="bg-red-800 p-2 rounded-t">
        <p className="font-bold text-2xl">{name}</p>
        <p className="font-light text-sm">
          Level {level} - {origin} - {arch}
        </p>
      </div>
      <div className="p-2 my-5">
        <p className="font-bold text-lg">Primary</p>
        <p>{primary}</p>
        <p className="font-bold text-lg">Secondary</p>
        <p>{secondary}</p>
      </div>
      <div className="p-2 bg-gray-900 rounded-b">
        <p className="font-bold text-lg">Revives Available</p>
        <p>{revives}</p>
      </div>
    </div>
  );
};

export default CharacterCard;

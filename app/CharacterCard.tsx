"use client";
import { Character } from "@/types";
import React from "react";
import revalidate from "./utils/revalidatePath";

const CharacterCard = ({ props }: { props: Character }) => {
  const { id, name, revives, arch, origin, level, primary, secondary } = props;

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return JSON.stringify({ error: "Error deleting character" });
      }
    } catch (error) {
      return JSON.stringify(error);
    } finally {
      revalidate("/");
    }
  };
  return (
    <div
      key={id}
      className="rounded flex flex-col w-64 h-fit transition-all duration-300 border-4 border-gray-200"
    >
      <div className="bg-red-800 p-2 rounded-t relative">
        <button
          onClick={() => handleDelete()}
          className="absolute top-3 right-5"
        >
          X
        </button>
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

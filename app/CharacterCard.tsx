"use client";
import { Character } from "@/types";
import React, { useState } from "react";
import revalidate from "./utils/revalidatePath";
import { IoMdClose } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";

const archetypes = [
  "Blaster",
  "Controller",
  "Defender",
  "Scrapper",
  "Tank",
  "Brute",
  "Mastermind",
  "Stalker",
  "Dominator",
  "Corruptor",
  "Sentinel",
];

const CharacterCard = ({ props }: { props: Character }) => {
  const {
    id,
    name,
    revives,
    arch,
    origin,
    level,
    primary,
    secondary,
    color,
    player,
  } = props;

  const [modal, setModal] = useState(false); // Modal state
  const [characterData, setCharacterData] = useState<Character>(props); // Local state for character details
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (value: boolean) => setModal(value);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Error deleting character");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      revalidate("/");
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/update?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
      });
      if (!response.ok) {
        throw new Error("Error updating character");
      }
      handleOpenModal(false); // Close modal after update
      revalidate("/"); // Refresh the data
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCharacterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getColor = () => {
    switch (color) {
      case "red":
        return "bg-red-900";
      case "blue":
        return "bg-blue-900";
      case "orange":
        return "bg-orange-900";
      case "green":
        return "bg-green-900";
      case "purple":
        return "bg-purple-900";
      case "gray":
        return "bg-gray-900";
      default:
        return "bg-black";
    }
  };

  const getArchIcon = () => `/images/${arch.toLowerCase()}.webp`;

  return (
    <div
      key={id}
      className="rounded flex flex-col w-fit min-w-64 h-fit transition-all duration-300 border-4 border-gray-200"
    >
      <div className={`${getColor()} p-2 rounded-t relative`}>
        <button
          onClick={() => handleDelete()}
          className="absolute top-3 right-3 hover:opacity-75 transition-all duration-300"
        >
          <IoMdClose className="size-5" />
        </button>
        <button
          onClick={() => handleOpenModal(true)}
          className="absolute bottom-3 right-3 hover:opacity-75 transition-all duration-300"
        >
          <MdOutlineModeEditOutline className="size-5" />
        </button>
        <div className="flex place-items-center w-full h-full space-x-2">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img src={getArchIcon()} alt={arch} className="w-6 h-6" />
          <p className="font-bold text-2xl text-left flex justify-start">
            {name}
          </p>
        </div>
        <p className="font-light text-sm">
          Level {level} - {origin} - {arch}
        </p>
        <p className="font-light text-sm">{player}</p>
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

      {/* Edit Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Character</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                value={characterData.name}
                onChange={handleChange}
                placeholder="Character Name"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <input
                type="number"
                name="level"
                value={characterData.level}
                onChange={handleChange}
                placeholder="Level"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <input
                type="text"
                name="origin"
                value={characterData.origin}
                onChange={handleChange}
                placeholder="Origin"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <select
                name="arch"
                value={characterData.arch}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-900 text-white"
              >
                <option value="" disabled>
                  Select Archetype
                </option>
                {archetypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="primary"
                value={characterData.primary}
                onChange={handleChange}
                placeholder="Primary Power"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <input
                type="text"
                name="secondary"
                value={characterData.secondary}
                onChange={handleChange}
                placeholder="Secondary Power"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <input
                type="number"
                name="revives"
                value={characterData.revives}
                onChange={handleChange}
                placeholder="Revives"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <select
                name="color"
                value={characterData.color}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-900 text-white"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="orange">Orange</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="gray">Gray</option>
                <option value="black">Black</option>
              </select>
              <input
                type="text"
                name="player"
                value={characterData.player}
                onChange={handleChange}
                placeholder="Player Name"
                className="w-full border p-2 rounded bg-gray-900"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => handleOpenModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;

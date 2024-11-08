"use client";

import { Character } from "@/types";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import revalidate from "./utils/revalidatePath";

const AddCharacterButton = () => {
  const [characterData, setCharacterData] = useState<Character>({
    id: uuidv4(),
    name: "",
    level: 1,
    origin: "",
    arch: "",
    primary: "",
    secondary: "",
    revives: 1,
    color: "",
    player: "",
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (value: boolean) => {
    setModal(value);
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

  const handleAddToon = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/add-toon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterInfo: characterData }),
      });

      if (!response.ok) {
        throw new Error("Error adding new character");
      }

      // Close the modal and reset form
      setModal(false);
      setCharacterData({
        id: uuidv4(),
        name: "",
        level: 1,
        origin: "",
        arch: "",
        primary: "",
        secondary: "",
        revives: 1,
        color: "",
        player: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      revalidate("/");
    }
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Character</h2>
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
                <option value="Blaster">Blaster</option>
                <option value="Controller">Controller</option>
                <option value="Defender">Defender</option>
                <option value="Scrapper">Scrapper</option>
                <option value="Tanker">Tanker</option>
                <option value="Brute">Brute</option>
                <option value="Mastermind">Mastermind</option>
                <option value="Stalker">Stalker</option>
                <option value="Dominator">Dominator</option>
                <option value="Corruptor">Corruptor</option>
                <option value="Sentinel">Sentinel</option>
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
                <option value="" disabled>
                  Select Color
                </option>
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
                  onClick={handleAddToon}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Character"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => handleOpenModal(true)}
        className="border-2 border-white rounded w-fit px-3 py-1 flex place-items-center place-content-center justify-between font-bold hover:bg-gray-500 transition-all duration-300"
      >
        Add New Toon <IoMdAdd className="ml-2" />
      </button>
    </>
  );
};

export default AddCharacterButton;

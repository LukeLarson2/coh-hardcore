"use client";

import { Character } from "@/types";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import revalidate from "./utils/revalidatePath";
import {
  origin,
  playStyles,
  playStyleArchs,
  brute,
  blaster,
  controller,
  corruptor,
  defender,
  dominator,
  mastermind,
  scrapper,
  sentinal,
  stalker,
  tanker,
} from "./lib/characterTypes";

const AddCharacterButton = () => {
  const [characterData, setCharacterData] = useState<Character>({
    id: uuidv4(),
    name: "",
    level: 1,
    playstyle: "",
    origin: "",
    arch: "",
    primary: "",
    secondary: "",
    revives: 0,
    color: "",
    player: "",
  });
  const [modal, setModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lastRolledStep, setLastRolledStep] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mulliganUsed, setMulliganUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fieldMapping = ["origin", "playstyle", "arch", "primary", "secondary"];

  const getOptionsForStep = (step: number): string[] => {
    if (step === 0) return origin;
    if (step === 1) return playStyles;
    if (step === 2 && characterData.playstyle) {
      return (
        playStyleArchs[
          characterData.playstyle as keyof typeof playStyleArchs
        ] || []
      );
    }
    if (step === 3) {
      const archetypePowers = {
        Brute: brute.primary,
        Blaster: blaster.primary,
        Controller: controller.primary,
        Corruptor: corruptor.primary,
        Defender: defender.primary,
        Dominator: dominator.primary,
        Mastermind: mastermind.primary,
        Scrapper: scrapper.primary,
        Sentinal: sentinal.primary,
        Stalker: stalker.primary,
        Tanker: tanker.primary,
      };
      return (
        archetypePowers[characterData.arch as keyof typeof archetypePowers] ||
        []
      );
    }
    if (step === 4) {
      const archetypePowers = {
        Brute: brute.secondary,
        Blaster: blaster.secondary,
        Controller: controller.secondary,
        Corruptor: corruptor.secondary,
        Defender: defender.secondary,
        Dominator: dominator.secondary,
        Mastermind: mastermind.secondary,
        Scrapper: scrapper.secondary,
        Sentinal: sentinal.secondary,
        Stalker: stalker.secondary,
        Tanker: tanker.secondary,
      };
      return (
        archetypePowers[characterData.arch as keyof typeof archetypePowers] ||
        []
      );
    }
    return [];
  };

  const handleSpin = (step: number, isMulligan = false) => {
    setIsSpinning(true);

    const currentOptions = getOptionsForStep(step);

    const spinInterval = setInterval(() => {
      const randomChoice =
        currentOptions[Math.floor(Math.random() * currentOptions.length)];
      setCharacterData((prevData) => ({
        ...prevData,
        [fieldMapping[step]]: randomChoice,
      }));
    }, 250);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalChoice =
        currentOptions[Math.floor(Math.random() * currentOptions.length)];
      setCharacterData((prevData) => ({
        ...prevData,
        [fieldMapping[step]]: finalChoice,
      }));

      setIsSpinning(false);
      setLastRolledStep(step);

      if (!isMulligan) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }, 3000);
  };

  const handleMulligan = () => {
    if (mulliganUsed || lastRolledStep === null) return;
    setMulliganUsed(true);
    handleSpin(lastRolledStep, true);
  };

  const handleOpenModal = (value: boolean) => {
    setModal(value);
    setCharacterData({
      id: uuidv4(),
      name: "",
      level: 1,
      playstyle: "",
      origin: "",
      arch: "",
      primary: "",
      secondary: "",
      revives: 0,
      color: "",
      player: "",
    });
    setCurrentStep(0);
    setLastRolledStep(null);
    setMulliganUsed(false);
    setIsSpinning(false);
  };

  const handleConfirmCharacter = () => {
    setModal(false);
    setReviewModal(true); // Open review modal with generated data
  };

  const handleFinalSubmit = async () => {
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

      setReviewModal(false);
      revalidate("/"); // Refresh or revalidate the data
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

  const options = [
    { label: "Origin" },
    { label: "Play Style" },
    { label: "Archetype" },
    { label: "Primary Power" },
    { label: "Secondary Power" },
  ];

  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className=" font-bold mb-4">Add New Character</h2>
            <form className="space-y-4">
              {options.map((option, index) => (
                <div key={option.label}>
                  <button
                    type="button"
                    onClick={() => handleSpin(index)}
                    disabled={isSpinning || currentStep !== index}
                    className={`w-full bg-blue-800 text-white px-4 py-2 rounded mb-2 ${
                      currentStep === index && "hover:opacity-75"
                    } duration-300 transition-all`}
                  >
                    {isSpinning && currentStep === index
                      ? `Spinning for ${option.label}...`
                      : characterData[fieldMapping[index] as keyof Character] ||
                        `Pick ${option.label}`}
                  </button>
                  {lastRolledStep === index && !mulliganUsed && !isSpinning && (
                    <button
                      type="button"
                      onClick={handleMulligan}
                      className="bg-red-800 text-white px-4 py-1 rounded w-full"
                    >
                      Mulligan
                    </button>
                  )}
                </div>
              ))}
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
                  onClick={handleConfirmCharacter}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!characterData.secondary}
                >
                  Confirm Character
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {reviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-4xl font-bold mb-4">Finalize Character</h2>
            <form className="space-y-4">
              <p>
                <strong>Origin:</strong> {characterData.origin}
              </p>
              <p>
                <strong>Play Style:</strong> {characterData.playstyle}
              </p>
              <p>
                <strong>Archetype:</strong> {characterData.arch}
              </p>
              <p>
                <strong>Primary Power:</strong> {characterData.primary}
              </p>
              <p>
                <strong>Secondary Power:</strong> {characterData.secondary}
              </p>
              <label>
                <p className="mt-4">Character Name</p>
                <input
                  type="text"
                  name="name"
                  value={characterData.name}
                  onChange={handleChange}
                  placeholder="Character Name"
                  className="w-full border p-2 rounded bg-gray-900 mb-4"
                />
              </label>
              <label>
                <p>Level</p>
                <input
                  type="number"
                  name="level"
                  value={characterData.level}
                  onChange={handleChange}
                  placeholder="Level"
                  className="w-full border p-2 rounded bg-gray-900 mb-4"
                />
              </label>
              <label>
                <p>Revives</p>
                <input
                  type="number"
                  name="revives"
                  value={characterData.revives}
                  onChange={handleChange}
                  placeholder="Revives"
                  className="w-full border p-2 rounded bg-gray-900 mb-4"
                />
              </label>
              <label>
                <p>Player Name</p>
                <input
                  type="text"
                  name="player"
                  value={characterData.player}
                  onChange={handleChange}
                  placeholder="Player Name"
                  className="w-full border p-2 rounded bg-gray-900 mb-4"
                />
              </label>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setReviewModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Save Character"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => handleOpenModal(true)}
        className="border-2 border-white rounded w-fit px-3 py-1 flex items-center justify-between font-bold hover:bg-gray-500 transition-all duration-300"
      >
        Add New Toon <IoMdAdd className="ml-2" />
      </button>
    </>
  );
};

export default AddCharacterButton;

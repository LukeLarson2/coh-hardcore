"use client";
import React, { useState } from "react";

const RandomCharacterSpinner = () => {
  const [maxVal, setMaxVal] = useState<number>(1); // default max value to avoid 0
  const [generatedVal, setGeneratedVal] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [displayVal, setDisplayVal] = useState<number | null>(null); // value shown in <p>

  const handleSpin = () => {
    if (maxVal <= 0) {
      alert("The number must be greater than 0");
      return;
    }

    setIsSpinning(true);
    setGeneratedVal(null); // Reset the generated value

    // Interval for the display value in <p> tag
    const displayInterval = setInterval(() => {
      setDisplayVal(Math.floor(Math.random() * maxVal) + 1);
    }, 50); // faster interval for display value

    // Main interval for final value determination
    const spinInterval = setInterval(() => {
      setGeneratedVal(Math.floor(Math.random() * maxVal) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      clearInterval(displayInterval);
      const finalValue = Math.floor(Math.random() * maxVal) + 1;
      setGeneratedVal(finalValue); // final value
      setDisplayVal(finalValue); // final display value
      setIsSpinning(false);
    }, 3000);
  };

  const handleModal = (value: boolean) => {
    if (!value) {
      setMaxVal(1);
      setGeneratedVal(null);
      setDisplayVal(null);
    }
    setShowModal(value);
  };

  return (
    <>
      <button
        onClick={() => handleModal(true)}
        className="border-2 border-white rounded w-fit px-3 py-1 flex place-items-center place-content-center justify-between font-bold hover:bg-gray-500 transition-all duration-300"
      >
        Toon RNG
      </button>
      {showModal && (
        <div
          className="flex w-screen h-screen place-content-center place-items-center fixed top-0 left-0 bg-[#000000aa] z-[9999]"
          onClick={() => handleModal(false)}
        >
          <div
            className="flex flex-col w-1/2 h-fit bg-black border-4 border-white rounded p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-center pb-8">
              Random Character Spinner
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <label className="w-full h-full">
                <input
                  type="number"
                  value={maxVal}
                  onChange={(e) => setMaxVal(parseInt(e.target.value) || 0)}
                  placeholder="Set max value"
                  className="border p-2 rounded w-full text-black"
                />
              </label>
              <div className="w-full h-full flex place-items-center place-content-center">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="bg-red-800 text-white px-4 py-2 rounded w-full h-fit"
                >
                  {isSpinning ? "Praying..." : "Pray"}
                </button>
              </div>
              <div className="shadow-inner bg-white text-black h-24 p-4 text-center rounded col-span-2 flex flex-col place-items-center place-content-center">
                {generatedVal ? (
                  <div className="flex w-full place-items-center place-content-center space-x-8">
                    {isSpinning ? (
                      <div className="text-center">
                        <p>The RNG Gods are measuring your worth...</p>
                        <p className="text-4xl font-bold">{displayVal}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p>You&apos;ve been gifted...</p>
                        <p className="text-4xl font-bold">{generatedVal}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <h2>Set your max value and pray to the RNG Gods...</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomCharacterSpinner;

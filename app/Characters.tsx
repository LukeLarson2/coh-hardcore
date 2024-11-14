import React from "react";
import { createClient } from "@supabase/supabase-js";
import CharacterCard from "./CharacterCard";
import AddCharacterButton from "./AddCharacterButton";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Characters = async () => {
  const { data, error } = await supabase.from("characters").select("*");

  if (error) {
    return (
      <div>
        Error getting characters: <div>{JSON.stringify(error)}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No characters found.</div>;
  }

  return (
    <div className="flex w-full h-full p-12 flex-col">
      <AddCharacterButton />
      <div className="grid grid-cols-4 gap-8 w-full h-full place-items-center place-content-center py-12">
        {data.map((toon) => (
          <CharacterCard key={toon.id} props={toon} />
        ))}
      </div>
    </div>
  );
};

export default Characters;

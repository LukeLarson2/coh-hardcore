import { createClient } from "@supabase/supabase-js";
import React from "react";
import CharacterCard from "../CharacterCard";

const Graveyard = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from("graveyard").select("*");

  if (error) {
    return JSON.stringify(error);
  }

  return (
    <div className="flex w-full h-full py-12 flex-col overflow-hidden pt-44">
      <div className="w-full px-10 font-bold text-2xl">
        Pay respects to those who have fallen...
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-4 gap-8 w-full h-full  md:place-items-center md:place-content-center xs:place-content-start py-12">
        {data.map((toon) => (
          <CharacterCard key={toon.id} props={toon} />
        ))}
      </div>
    </div>
  );
};

export default Graveyard;

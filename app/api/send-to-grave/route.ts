import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { characterData } = await req.json();

  console.log(characterData);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (characterData.playstyle) {
    delete characterData.playstyle;
  }

  try {
    const { error: insertError } = await supabase
      .from("graveyard")
      .insert(characterData);

    if (insertError) {
      console.error("Graveyard Insert Error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    const { error: deleteError } = await supabase
      .from("characters")
      .delete()
      .eq("id", characterData.id);

    if (deleteError) {
      console.error("Characters Delete Error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({
      status: 201,
      message: "Character added to graveyard",
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

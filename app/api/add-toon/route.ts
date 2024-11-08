import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { characterInfo } = await req.json();

  // Log the payload to ensure it's correctly formatted

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { data, error } = await supabase
      .from("characters")
      .insert(characterInfo);

    if (error) {
      console.error("Insert Error:", error);
      return NextResponse.json({ Error: error }, { status: 400 });
    }

    // Confirm the insertion by returning the inserted data
    return NextResponse.json(
      { message: "Character added successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

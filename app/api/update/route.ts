import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  // Parse URL to retrieve `id` parameter
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // Check if `id` is provided
  if (!id) {
    return NextResponse.json(
      { error: "Missing character ID" },
      { status: 400 }
    );
  }

  // Parse the request body for updated character data
  const updatedCharacter = await req.json();

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // Perform update operation
    const { data, error } = await supabase
      .from("characters")
      .update(updatedCharacter) // Use the data from request body to update
      .eq("id", id); // Filter by the character ID

    if (error) {
      console.error("Update Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Character updated successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

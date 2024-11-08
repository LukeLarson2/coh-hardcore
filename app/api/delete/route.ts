import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // Perform delete operation
    const { data, error } = await supabase
      .from("characters")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Character deleted successfully", data },
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

import { NextResponse } from "next/server";
import type { NudgetContentItem } from "@/lib/nudget-client";

interface FilterRequestBody {
  items: NudgetContentItem[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FilterRequestBody;

    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Request body must include an items array" },
        { status: 400 }
      );
    }

    // Pass-through scaffold — pipeline-engineer will add LLM filtering here
    return NextResponse.json({
      items: body.items,
      filtered: body.items.length,
      total: body.items.length,
    });
  } catch (error) {
    console.error("Daily feed filter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

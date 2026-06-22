import { NextResponse } from "next/server";

import { getQuoteBuilderData } from "@/lib/catalog/getQuoteBuilderData";

export async function GET() {
  try {
    const data = await getQuoteBuilderData();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load quote builder data",
      },
      {
        status: 500,
      },
    );
  }
}

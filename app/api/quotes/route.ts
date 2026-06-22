import { NextRequest, NextResponse } from "next/server";

import { createQuote } from "@/lib/quote/createQuote";
import { createQuoteSchema } from "@/lib/validations/createQuote";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = createQuoteSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const quote = await createQuote(validationResult.data);

    return NextResponse.json(quote, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create quote",
      },
      {
        status: 500,
      },
    );
  }
}

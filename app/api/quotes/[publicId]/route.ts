import { NextResponse } from "next/server";

import { getQuoteByPublicId } from "@/lib/quote/getQuoteByPublicId";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      publicId: string;
    }>;
  },
) {
  try {
    const { publicId } = await params;

    const quote = await getQuoteByPublicId(publicId);

    if (!quote) {
      return NextResponse.json(
        {
          message: "Quote not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch quote",
      },
      {
        status: 500,
      },
    );
  }
}

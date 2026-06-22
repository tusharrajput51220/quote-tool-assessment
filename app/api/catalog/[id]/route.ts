import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const catalog = await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        tiers: true,

        features: {
          include: {
            tierFeatures: {
              include: {
                tier: true,
              },
            },
          },
        },
      },
    });

    if (!catalog) {
      return NextResponse.json(
        {
          message: "Catalog not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(catalog);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch catalog",
      },
      {
        status: 500,
      },
    );
  }
}

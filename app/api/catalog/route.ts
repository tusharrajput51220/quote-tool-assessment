import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCatalog } from "@/lib/catalog/createCatalog";

// GET ALL CATALOGS
export async function GET() {
  try {
    const catalogs = await prisma.product.findMany({
      include: {
        tiers: {
          orderBy: {
            basePrice: "asc",
          },
        },

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

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(catalogs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch catalogs",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE CATALOG
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const catalog = await createCatalog(body);

    return NextResponse.json(catalog, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create catalog",
      },
      {
        status: 500,
      },
    );
  }
}

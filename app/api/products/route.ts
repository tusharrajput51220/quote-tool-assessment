import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL PRODUCTS
export async function GET() {
  console.log("hello");
  try {
    const products = await prisma.product.findMany({
      include: {
        tiers: true,
        features: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// CREATE PRODUCT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Product name is required" },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
      },
    });

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}

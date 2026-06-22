import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET SINGLE PRODUCT
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        tiers: true,
        features: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// UPDATE PRODUCT
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { name } = body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 },
    );
  }
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function serialize(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(req: NextRequest) {
  const visibleProducts = await prisma.product.findMany({});
  const hiddenProducts = await prisma.product.findMany({
    where: { hidden: true }
  });

  return NextResponse.json(
    serialize({ visibleProducts, hiddenProducts }),
    { status: 200 }
  );
}
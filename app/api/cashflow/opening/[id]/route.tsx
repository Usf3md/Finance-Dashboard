import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const opening = await prisma?.opening.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!opening)
    return NextResponse.json(
      { error: "Opening Doesn't Exist" },
      { status: 404 }
    );

  await prisma?.opening.delete({
    where: {
      id: opening.id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}

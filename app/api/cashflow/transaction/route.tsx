import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { z } from "zod";
import prisma from "@/lib/client";

type bodyType = z.infer<typeof schema>;
export async function POST(request: NextRequest) {
  const body: bodyType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const openingExists = await prisma.opening.findUnique({
    where: {
      id: body.openingId,
    },
  });
  if (!openingExists)
    return NextResponse.json(
      { error: "Opening Doesn't Exist" },
      { status: 404 }
    );

  const transaction = await prisma.transaction.create({
    data: {
      openingId: body.openingId,
      name: body.name,
      email: body.email,
      amount: body.amount,
      type: body.type,
      detail: body.detail,
      note: body.note,
      image: body.image,
    },
  });
  return NextResponse.json(transaction, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { z } from "zod";
import prisma from "@/lib/client";

type BodyType = z.infer<typeof schema>;

export async function GET(request: NextRequest) {
  const openings = await prisma.opening.findMany({
    include: {
      transactions: true,
    },
  });
  return NextResponse.json(openings);
}
export async function POST(request: NextRequest) {
  const body: BodyType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  let opening;
  try {
    opening = await prisma?.opening.create({
      data: {
        date: body.date,
        balance: body.balance,
      },
    });
  } catch (error) {
    return NextResponse.json(error, { status: 409 });
  }

  return NextResponse.json(opening, { status: 201 });
}

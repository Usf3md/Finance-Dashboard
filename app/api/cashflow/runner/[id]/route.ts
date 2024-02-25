import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `http://localhost:9000/cashflow/runners/${params.id}/`
  );

  return response;
}

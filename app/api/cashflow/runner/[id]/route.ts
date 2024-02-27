import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const runner = await fetch(
    `${process.env.BACKEND_URL}cashflow/runners/${params.id}/`
  );

  return NextResponse.json(await runner.json(), { status: runner.status });
}

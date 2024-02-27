import { NextRequest, NextResponse } from "next/server";
import { getAccessCookie } from "@/app/api/services/cookies-managment";

export async function GET(request: NextRequest) {
  const runner = await fetch(`${process.env.BACKEND_URL}cashflow/runners/me`, {
    headers: {
      Authorization: getAccessCookie(request),
    },
  });
  return NextResponse.json(await runner.json(), { status: runner.status });
}

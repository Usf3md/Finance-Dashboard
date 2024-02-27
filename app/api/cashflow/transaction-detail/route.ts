import { NextRequest, NextResponse } from "next/server";
import { getAccessCookie } from "../../services/cookies-managment";

export async function GET(request: NextRequest) {
  const details = await fetch(
    `${process.env.BACKEND_URL}cashflow/transaction-details/`,
    {
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return NextResponse.json(await details.json(), { status: details.status });
}

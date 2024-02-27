import { NextRequest, NextResponse } from "next/server";
import schema, { Transaction } from "./schema";
import { getAccessCookie } from "../../services/cookies-managment";

export async function GET(request: NextRequest) {
  const openingId = request.nextUrl.searchParams.get("openingId") ?? "";
  const transactions = await fetch(
    `${process.env.BACKEND_URL}cashflow/transactions/?openingId=${openingId}`,
    {
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return NextResponse.json(await transactions.json(), {
    status: transactions.status,
  });
}

export async function POST(request: NextRequest) {
  const body: Transaction = await request.json();
  const transaction = await fetch(
    `${process.env.BACKEND_URL}cashflow/transactions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessCookie(request),
      },
      body: JSON.stringify(body),
    }
  );
  return NextResponse.json(await transaction.json(), {
    status: transaction.status,
  });
}

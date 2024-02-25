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
  return transactions;
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
  return transaction;
}

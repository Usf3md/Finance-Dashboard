import { NextRequest } from "next/server";
import { getAccessCookie } from "@/app/api/services/cookies-managment";

export async function GET(request: NextRequest) {
  const transactions = await fetch(
    `${process.env.BACKEND_URL}cashflow/runners/me`,
    {
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return transactions;
}

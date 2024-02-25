import { NextRequest, NextResponse } from "next/server";
import schema, { Opening } from "./schema";
import { getAccessCookie } from "../../services/cookies-managment";

export async function GET(request: NextRequest) {
  const openings = await fetch(`${process.env.BACKEND_URL}cashflow/openings/`, {
    headers: {
      Authorization: getAccessCookie(request),
    },
  });
  return openings;
}
export async function POST(request: NextRequest) {
  const body: Opening = await request.json();
  let status;
  const opening = await fetch(`${process.env.BACKEND_URL}cashflow/openings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessCookie(request),
    },
    body: JSON.stringify(body),
  }).then((response) => {
    status = response.status;
    return response.json();
  });
  return NextResponse.json(opening, { status: status });
}

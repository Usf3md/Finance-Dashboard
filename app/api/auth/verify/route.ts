import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import { getAccessCookie } from "../../services/cookies-managment";
export async function POST(request: NextRequest) {
  let status;
  const verifyResponse = await fetch(`${env.BACKEND_URL}auth/jwt/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getAccessCookie(request, "") }),
  }).then((response) => {
    status = response.status;
    return response.json();
  });
  return NextResponse.json(verifyResponse, { status: status });
}

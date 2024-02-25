import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import {
  getAccessCookie,
  getRefreshToken,
} from "../../services/cookies-managment";
import { Tokens } from "../schema";
export async function POST(request: NextRequest) {
  let status;
  const verifyResponse: Tokens = await fetch(
    `${env.BACKEND_URL}auth/jwt/refresh/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ refresh: getRefreshToken(request, "") }),
    }
  ).then((response) => {
    status = response.status;
    return response.json();
  });
  if (status === 200) {
    let response = new NextResponse();
    response.cookies.set("access", verifyResponse.access, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
    });
    return response;
  }
  return NextResponse.json(verifyResponse, { status: status });
}

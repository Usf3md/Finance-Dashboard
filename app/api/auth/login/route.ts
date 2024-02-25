import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import { Credentials, Tokens, credentialsSchema } from "../schema";

export async function POST(request: NextRequest) {
  const body: Credentials = await request.json();
  const validation = credentialsSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  let status;
  const tokenResponse: Tokens = await fetch(
    `${env.BACKEND_URL}auth/jwt/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(body),
    }
  ).then((response) => {
    status = response.status;
    return response.json();
  });
  if (status === 200) {
    let response = new NextResponse();
    response.cookies.set("access", tokenResponse.access, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set("refresh", tokenResponse.refresh!, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
    });

    return response;
  }
  return NextResponse.json(tokenResponse, { status: status });
}

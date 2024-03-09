import { NextRequest, NextResponse } from "next/server";
import { getAccessCookie } from "@/app/api/services/cookies-managment";

export async function GET(request: NextRequest) {
  const user = await fetch(`${process.env.BACKEND_URL}auth/users/me/`, {
    headers: {
      Authorization: getAccessCookie(request),
    },
  });
  return NextResponse.json(await user.json(), { status: user.status });
}

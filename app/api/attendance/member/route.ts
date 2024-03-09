import { NextRequest, NextResponse } from "next/server";
import { getAccessCookie } from "../../services/cookies-managment";

export async function GET(request: NextRequest) {
  const min_date = request.nextUrl.searchParams.get("min_date") ?? "";
  const max_date = request.nextUrl.searchParams.get("max_date") ?? "";
  const members = await fetch(
    `${process.env.BACKEND_URL}attendance/members/?min_date=${min_date}&max_date=${max_date}`,
    {
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return NextResponse.json(await members.json(), {
    status: members.status,
  });
}

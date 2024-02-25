import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export async function POST(request: NextRequest) {
  let response = new NextResponse();
  response.cookies.set("access", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  response.cookies.set("refresh", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  return response;
}

import { getAccessCookie } from "@/app/api/services/cookies-managment";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}cashflow/openings/${params.id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );

  return response;
}

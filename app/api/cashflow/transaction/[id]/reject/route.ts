import { getAccessCookie } from "@/app/api/services/cookies-managment";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const transaction = await fetch(
    `${process.env.BACKEND_URL}/cashflow/transactions/${params.id}/reject/`,
    {
      method: "PATCH",
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return NextResponse.json(await transaction.json(), {
    status: transaction.status,
  });
}

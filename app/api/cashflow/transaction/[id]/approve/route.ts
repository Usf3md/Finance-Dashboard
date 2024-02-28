import { getAccessCookie } from "@/app/api/services/cookies-managment";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const transaction = await fetch(
    `${process.env.BACKEND_URL}/cashflow/transactions/${params.id}/approve/`,
    {
      method: "PATCH",
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return new Response(null, { status: transaction.status });
}

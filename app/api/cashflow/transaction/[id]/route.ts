import { getAccessCookie } from "@/app/api/services/cookies-managment";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}cashflow/transactions/${params.id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: getAccessCookie(request),
      },
    }
  );
  return new Response(null, { status: response.status });
}

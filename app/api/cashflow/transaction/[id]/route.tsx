import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const transaction = await prisma?.transaction.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!transaction)
    return NextResponse.json(
      { error: "Transaction Doesn't Exist" },
      { status: 404 }
    );

  await prisma?.transaction.delete({
    where: {
      id: transaction.id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}

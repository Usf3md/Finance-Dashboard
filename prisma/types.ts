import { Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `Post`
const openingWithTransactions = Prisma.validator<Prisma.OpeningDefaultArgs>()({
  include: { transactions: true },
});

export type OpeningWithTransactions = Prisma.OpeningGetPayload<
  typeof openingWithTransactions
>;

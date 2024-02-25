import { Transaction } from "@/app/api/cashflow/transaction/schema";
import create from "./http-service";
import { Runner } from "@/app/api/cashflow/runner/schema";
import { Opening } from "@/app/api/cashflow/opening/schema";
import { TransactionDetail } from "@/app/api/cashflow/transaction-detail/schema";

const baseURL = "/api";
const headers = {
  "Content-Type": "application/json",
};

export const UserService = create(`${baseURL}/users/`, headers);
export const OpeningService = create<Opening>(
  `${baseURL}/cashflow/opening/`,
  headers
);
export const TransactionService = create<Transaction>(
  `${baseURL}/cashflow/transaction/`,
  headers
);
export const RunnerService = create<Runner>(
  `${baseURL}/cashflow/runner/`,
  headers
);
export const TransactionDetailService = create<TransactionDetail>(
  `${baseURL}/cashflow/transaction-detail/`,
  headers
);

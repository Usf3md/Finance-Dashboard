"use client";
import { TransactionDetail } from "@/app/api/cashflow/transaction-detail/schema";
import AddTransactionForm from "../../components/AddTransactionForm";
import { useContext, useEffect, useState } from "react";
import RunnerContext from "@/app/contexts/RunnerContext";
import { TransactionDetailService } from "@/services/clients";

interface Props {
  searchParams: { openingId: string };
}

const Page = async ({ searchParams: { openingId } }: Props) => {
  const { runner, setRunner } = useContext(RunnerContext);
  const [details, setDetails] = useState<TransactionDetail[]>([]);
  useEffect(() => {
    TransactionDetailService.getAll(true).then((res) => {
      setDetails(res.data);
    });
  }, []);

  return (
    <article>
      <AddTransactionForm
        openingId={openingId}
        currentRunner={runner}
        details={details}
      />
    </article>
  );
};

export default Page;

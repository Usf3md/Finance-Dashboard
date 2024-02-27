"use client";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import TransactionsTable from "./components/TransactionsTable";
import DateDropDown from "./components/DateDropDown";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { Transaction } from "../api/cashflow/transaction/schema";
import { OpeningService, TransactionService } from "@/services/clients";
import { useContext, useEffect, useState } from "react";
import { Opening } from "../api/cashflow/opening/schema";
import FullPageSpinner from "../components/FullPageSpinner";
import RunnerContext from "../contexts/RunnerContext";
import { RUNNER_ROLES } from "../api/cashflow/runner/schema";
import ActionButton from "../components/ActionButton";
import StatusChip from "./components/StatusChip";

interface Props {
  searchParams: { openingId: string };
}
const Page = ({ searchParams: { openingId } }: Props) => {
  const [currentOpening, setCurrentOpening] = useState<Opening>();
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [isOpeningLoading, setIsOpeningLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);
  const { runner, setRunner } = useContext(RunnerContext);
  const [statusFilters, setStatusFilters] = useState(["a", "r", "p"]);

  const handleOpeningDelete = (openingId: number) => {
    const fullOpenings = openings;
    const newOpenings = openings.filter((opening) => opening.id != openingId);
    setOpenings(newOpenings);
    OpeningService.delete(openingId).then((res) => {
      if (!res.success) setOpenings(fullOpenings);
    });
  };
  const toggleTransactionFilter = (status: string) => {
    let filters = [...statusFilters];
    if (filters.includes(status))
      filters = filters.filter((filter) => filter !== status);
    else filters = [...filters, status];
    setStatusFilters(filters);
  };
  const handleTransactionStatusChange = (
    transactionId: number,
    status: string,
    endpoint: string
  ) => {
    const currentTransaction = transactions.find(
      (transaction) => transaction.id === transactionId
    );
    if (!currentTransaction) return;
    const oldStatus = currentTransaction.transaction_status;
    setTransactions((prevTransactions) =>
      structuredClone(prevTransactions).map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, transaction_status: status }
          : transaction
      )
    );
    fetch(`/api/cashflow/transaction/${currentTransaction.id}/${endpoint}`, {
      method: "PATCH",
    }).then((res) => {
      if (!res.ok)
        setTransactions((prevTransactions) =>
          structuredClone(prevTransactions).map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, transaction_status: oldStatus }
              : transaction
          )
        );
    });
  };
  const handleTransactionsDelete = (transactionId: number) => {
    const fullTransactions = transactions;
    setTransactions(
      transactions.filter((transaction) => transaction.id != transactionId)
    );
    TransactionService.delete(transactionId).then((res) => {
      if (!res.success) setTransactions(fullTransactions);
    });
  };

  useEffect(() => {
    OpeningService.getAll(true).then((res) => {
      if (res.success) {
        let rawOpenings = res.data;
        rawOpenings.forEach((opening) => {
          opening.date = new Date(opening.date);
        });
        rawOpenings.sort((a, b) => a.date.getTime() - b.date.getTime());
        setOpenings(rawOpenings);
        setIsOpeningLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (currentOpening) {
      setIsTransactionLoading(true);
      TransactionService.getAll(true, `?openingId=${currentOpening.id}`)
        .then((res) => {
          if (res.success) {
            let rawTransactions = res.data;
            setTransactions(rawTransactions);
          }
        })
        .finally(() => setIsTransactionLoading(false));
    } else setIsTransactionLoading(false);
  }, [currentOpening]);
  let opening = openings[openings.length - 1];
  if (openingId) {
    const match = openings.find(
      (opening) => opening.id === parseInt(openingId)
    );
    if (match) opening = match;
  }
  if ((opening && !currentOpening) || opening?.id !== currentOpening?.id) {
    setCurrentOpening(opening);
    setTransactions([]);
  }
  let balance = currentOpening?.balance;
  if (balance === undefined) balance = 0;

  let total_loss = 0;
  let total_gain = 0;
  transactions.forEach(
    (transaction) => (transaction.date = new Date(transaction.date))
  );

  const filteredTransactions = transactions.filter((transaction) =>
    statusFilters.includes(transaction.transaction_status!)
  );
  for (const transaction of filteredTransactions) {
    if (transaction.transaction_type) total_gain += transaction.amount;
    else total_loss += transaction.amount;
  }
  return (
    <>
      {isOpeningLoading ? (
        <FullPageSpinner />
      ) : (
        <div className=" flex flex-col gap-11">
          <article className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-8">
            <Card className=" flex-col items-start p-4 rounded-md">
              <CardHeader className="flex-row items-end gap-2">
                <p className=" text-xl font-bold">Starting Balance:</p>
                <p className="">${balance.toString()}</p>
              </CardHeader>
              <CardBody className="flex flex-col flex-wrap gap-4">
                <p className="text-2xl font-bold" id="balance">
                  ${(balance - total_loss + total_gain).toString()}
                </p>
                <div className="flex flex-row">
                  <Chip
                    startContent={<FaArrowDownLong />}
                    variant="light"
                    color="danger"
                  >
                    ${total_loss.toString()}
                  </Chip>
                  <Chip
                    startContent={<FaArrowUpLong />}
                    variant="light"
                    color="success"
                  >
                    ${total_gain.toString()}
                  </Chip>
                </div>
              </CardBody>
            </Card>
            <Card className=" p-4 rounded-md">
              <CardHeader className="flex-col items-start">
                <label htmlFor="opening-date" className="text-xl font-bold">
                  Opening Date
                </label>
              </CardHeader>
              <CardBody className="text-2xl font-bold flex flex-row items-end gap-4">
                {openings.length > 0 && (
                  <DateDropDown
                    openings={openings}
                    selectedOpening={currentOpening!}
                  />
                )}
                {runner?.role == RUNNER_ROLES.MAKER && (
                  <div className="flex flex-row gap-2">
                    <ActionButton
                      color="primary"
                      href="/cashflow/opening/add/"
                      tip="Add Opening"
                    >
                      <IoIosAdd className="text-lg" />
                    </ActionButton>
                    {openings.length > 0 && (
                      <>
                        <ActionButton
                          color="warning"
                          href="/cashflow/opening/edit/1"
                          tip="Edit Opening"
                        >
                          <MdOutlineEditCalendar className="text-lg" />
                        </ActionButton>
                        <ActionButton
                          color="danger"
                          tip="Delete Opening"
                          onClick={() =>
                            handleOpeningDelete(currentOpening?.id!)
                          }
                        >
                          <FaRegTrashAlt className="text-lg" />
                        </ActionButton>
                      </>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
          </article>
          {isTransactionLoading ? (
            <FullPageSpinner />
          ) : (
            <article className="flex flex-col gap-4">
              <div className=" flex justify-between items-end">
                <label className=" font-bold text-2xl">Transactions</label>
                <div className="flex gap-8 justify-between items-end">
                  <div className="flex gap-2">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleTransactionFilter("a")}
                    >
                      <StatusChip
                        variant={statusFilters.includes("a") ? "flat" : "faded"}
                        color="success"
                      >
                        Accepted
                      </StatusChip>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleTransactionFilter("r")}
                    >
                      <StatusChip
                        variant={statusFilters.includes("r") ? "flat" : "faded"}
                        color="danger"
                      >
                        Rejected
                      </StatusChip>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleTransactionFilter("p")}
                    >
                      <StatusChip
                        variant={statusFilters.includes("p") ? "flat" : "faded"}
                        color="warning"
                      >
                        Pending
                      </StatusChip>
                    </div>
                  </div>
                  {currentOpening?.id && (
                    <ActionButton
                      color="primary"
                      href={`/cashflow/transaction/add?openingId=${currentOpening.id}`}
                      tip="Add Transaction"
                    >
                      <IoIosAdd className="text-lg" />
                    </ActionButton>
                  )}
                </div>
              </div>
              <TransactionsTable
                transactions={filteredTransactions}
                handleDelete={handleTransactionsDelete}
                handleStatusChange={handleTransactionStatusChange}
              />
            </article>
          )}
        </div>
      )}
    </>
  );
};
export default Page;

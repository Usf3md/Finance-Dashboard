"use client";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import TransactionsTable from "./components/TransactionsTable";
import DateDropDown from "./components/DateDropDown";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import ActionButton from "./components/ActionButton";
import { OpeningWithTransactions } from "@/prisma/types";

interface Props {
  searchParams: { openingId: string };
}
const Page = async ({ searchParams: { openingId } }: Props) => {
  let openings: OpeningWithTransactions[] = await fetch(
    "/api/cashflow/opening/",
    { cache: "no-store" }
  ).then((response) => response.json());

  const handleDelete = async (oId: number) => {
    console.log(
      await fetch(`/api/cashflow/opening/${oId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((_) => {
          location.reload();
        })
    );
  };

  openings.forEach((opening) => {
    opening.date = new Date(opening.date);
  });
  openings.sort((a, b) => a.date.getTime() - b.date.getTime());
  if (openings === undefined) openings = [];
  let currentOpening = openings[openings.length - 1];
  if (openingId) {
    const match = openings.find(
      (opening) => opening.id === parseInt(openingId)
    );
    if (match) currentOpening = match;
  }
  let balance = currentOpening?.balance;
  if (balance === undefined) balance = 0;

  let total_loss = 0;
  let total_gain = 0;
  let transactions = currentOpening?.transactions;
  if (!transactions) transactions = [];
  for (const transaction of transactions) {
    transaction.date = new Date(transaction.date);
    if (transaction.type) total_gain += transaction.amount;
    else total_loss += transaction.amount;
  }
  return (
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
            {currentOpening?.id && (
              <DateDropDown
                openings={openings}
                selectedOpening={currentOpening}
              />
            )}
            <div className="flex flex-row gap-2">
              <ActionButton
                color="primary"
                href="cashflow/opening/add/"
                tip="Add Opening"
              >
                <IoIosAdd className="text-lg" />
              </ActionButton>
              <ActionButton
                color="warning"
                href="cashflow/transaction/edit/1"
                tip="Edit Opening"
              >
                <MdOutlineEditCalendar className="text-lg" />
              </ActionButton>
              <ActionButton
                color="danger"
                tip="Delete Opening"
                onClick={() => handleDelete(currentOpening.id)}
              >
                <FaRegTrashAlt className="text-lg" />
              </ActionButton>
            </div>
          </CardBody>
        </Card>
      </article>
      <article className="flex flex-col gap-4">
        <div className=" flex justify-between items-end">
          <label className=" font-bold text-2xl">Transactions</label>
          {currentOpening?.id && (
            <ActionButton
              color="primary"
              href={`cashflow/transaction/add?openingId=${currentOpening.id}`}
              tip="Add Transaction"
            >
              <IoIosAdd className="text-lg" />
            </ActionButton>
          )}
        </div>
        <TransactionsTable transactions={transactions} />
      </article>
    </div>
  );
};
export default Page;

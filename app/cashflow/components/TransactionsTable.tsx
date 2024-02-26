"use client";
import { Transaction } from "@/app/api/cashflow/transaction/schema";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { FaArrowUpLong, FaXmark } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import ActionButton from "../../components/ActionButton";
import { useContext } from "react";
import RunnerContext from "@/app/contexts/RunnerContext";
import { RUNNER_ROLES } from "@/app/api/cashflow/runner/schema";
import StatusChip from "./StatusChip";
interface Props {
  transactions: Transaction[];
  handleDelete(transactionId: number): void;
  handleStatusChange(
    transactionId: number,
    status: string,
    endpoint: string
  ): void;
}

const TransactionsTable = ({
  transactions,
  handleDelete,
  handleStatusChange,
}: Props) => {
  const { runner, setRunner } = useContext(RunnerContext);
  return (
    <Table aria-label="Example static collection table" radius="sm">
      <TableHeader>
        <TableColumn>T No.</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Detail</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No Transactions to display."}>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            className=" hover:bg-default-100 transition-background hover:duration-150"
          >
            <TableCell>#{String(transaction.id).padStart(4, "0")}</TableCell>

            <TableCell>
              {
                // @ts-ignore
                transaction.runner.full_name
              }
            </TableCell>

            <TableCell>{transaction.transaction_detail}</TableCell>
            <TableCell>${transaction.amount.toString()}</TableCell>
            <TableCell>
              {transaction.transaction_type ? (
                <FaArrowUpLong className=" text-success" />
              ) : (
                <FaArrowDownLong className=" text-danger" />
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-between items-center">
                <div>
                  {transaction.transaction_status == "a" && (
                    <StatusChip variant="flat" color="success">
                      Accepted
                    </StatusChip>
                  )}
                  {transaction.transaction_status == "r" && (
                    <StatusChip variant="flat" color="danger">
                      Rejected
                    </StatusChip>
                  )}
                  {transaction.transaction_status == "p" && (
                    <StatusChip variant="flat" color="warning">
                      Pending
                    </StatusChip>
                  )}
                </div>
                {runner.role === RUNNER_ROLES.MAKER &&
                  transaction.transaction_status == "p" && (
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        className="rounded-md"
                        size="sm"
                        color="success"
                        variant="flat"
                        onClick={() =>
                          handleStatusChange(transaction.id!, "a", "approve")
                        }
                      >
                        <FaCheck className="text-md" />
                      </Button>
                      <Button
                        isIconOnly
                        className="rounded-md"
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() =>
                          handleStatusChange(transaction.id!, "r", "reject")
                        }
                      >
                        <FaXmark className="text-md" />
                      </Button>
                    </div>
                  )}
              </div>
            </TableCell>
            <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <ActionButton
                color="danger"
                tip="Delete Transaction"
                size="sm"
                onClick={() => handleDelete(transaction.id!)}
              >
                <FaRegTrashAlt className="text-small" />
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

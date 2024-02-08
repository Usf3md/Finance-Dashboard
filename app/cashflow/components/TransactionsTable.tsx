"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { Transaction } from "@prisma/client";
import { FaRegTrashAlt } from "react-icons/fa";
interface Props {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: Props) => {
  const handleDelete = async (transactionId: number) => {
    console.log(
      await fetch(
        `http://localhost:3000/api/cashflow/transaction/${transactionId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((_) => {
          location.reload();
        })
    );
  };
  return (
    <Table aria-label="Example static collection table" radius="sm">
      <TableHeader>
        <TableColumn>Runner Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Transaction Type</TableColumn>
        <TableColumn>Transaction Date</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No Transactions to display."}>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            className=" hover:bg-default-100 transition-background hover:duration-150"
          >
            <TableCell>{transaction.name}</TableCell>
            <TableCell>{transaction.email}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toString()}</TableCell>
            <TableCell>
              {transaction.type ? (
                <Chip className=" text-xs" variant="bordered" color="success">
                  CASH IN
                </Chip>
              ) : (
                <Chip className=" text-xs" variant="bordered" color="danger">
                  CASH OUT
                </Chip>
              )}
            </TableCell>
            <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <Tooltip
                color={"danger"}
                content={"Delete Transaction"}
                className="capitalize"
                size="sm"
              >
                <Button
                  size="sm"
                  onClick={() => handleDelete(transaction.id)}
                  isIconOnly
                  className={`bg-danger rounded-md`}
                >
                  <FaRegTrashAlt className="text-md" />
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

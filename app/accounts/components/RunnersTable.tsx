"use client";
import { RUNNER_ROLES, Runner } from "@/app/api/cashflow/runner/schema";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
interface Props {
  runners: Runner[];
}

const RunnersTable = ({ runners }: Props) => {
  return (
    <Table aria-label="Example static collection table" radius="sm">
      <TableHeader>
        <TableColumn>Runner ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No Transactions to display."}>
        {runners.map((runner) => (
          <TableRow
            key={runner.id}
            className=" hover:bg-default-100 transition-background hover:duration-150"
          >
            <TableCell>#{String(runner.id).padStart(4, "0")}</TableCell>

            <TableCell>{runner.full_name}</TableCell>
            <TableCell>{runner.email}</TableCell>
            <TableCell>
              {runner.role == RUNNER_ROLES.CHECKER && (
                <Chip className=" text-xs" variant="flat" color="secondary">
                  Maker
                </Chip>
              )}
              {runner.role == RUNNER_ROLES.MAKER && (
                <Chip className=" text-xs" variant="flat" color="primary">
                  Checker
                </Chip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RunnersTable;

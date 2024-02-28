"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Opening } from "@/app/api/cashflow/opening/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  openings: Opening[];
  selectedOpening: Opening;
}

const DateDropDown = ({ openings, selectedOpening }: Props) => {
  const router = useRouter();
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`?openingId=${e.target.value}`);
  };
  return (
    <Select
      label="Opening"
      placeholder="Select an opening"
      onChange={handleSelectionChange}
      defaultSelectedKeys={[selectedOpening.id!.toString()]}
      radius="sm"
    >
      {openings.map((opening) => (
        <SelectItem key={opening.id!} value={opening.id}>
          {opening.date.toLocaleDateString()}
        </SelectItem>
      ))}
    </Select>
  );
};

export default DateDropDown;

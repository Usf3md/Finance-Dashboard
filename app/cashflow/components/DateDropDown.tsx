"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Opening } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  openings: Opening[];
  selectedOpening: Opening;
}

const DateDropDown = ({ openings, selectedOpening }: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger className="w-full rounded-md">
        <Button variant="bordered" className="capitalize">
          {selectedOpening.date.toLocaleDateString()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
      >
        {openings.map((opening) => (
          <DropdownItem
            as={Link}
            href={`?openingId=${opening.id}`}
            key={opening.id}
          >
            {opening.date.toLocaleDateString()}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DateDropDown;

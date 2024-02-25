"use client";
import {
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Authenticator from "@/services/auth/auth";
import { Runner } from "@/app/api/cashflow/runner/schema";
import RunnerContext from "@/app/contexts/RunnerContext";

const AccountButton = () => {
  const { runner, setRunner } = useContext(RunnerContext);
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          className="transition-transform"
          description={runner?.email}
          name={runner?.full_name}
          avatarProps={{
            fallback: <AvatarIcon />,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{runner?.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">
            Role: {runner?.role == "m" ? "Maker" : "Checker"}
          </p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => {
            Authenticator.logout().then(() => location.reload());
            setRunner({} as Runner);
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AccountButton;

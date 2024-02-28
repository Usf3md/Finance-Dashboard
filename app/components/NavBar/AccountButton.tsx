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
import { RUNNER_ROLES, Runner } from "@/app/api/cashflow/runner/schema";
import RunnerContext from "@/app/contexts/RunnerContext";
import { titleCase } from "@/services/utils";

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
        <DropdownItem key="profile" className=" gap-2 py-2">
          <p className="font-bold">Signed in as</p>
          <p>{runner?.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" className="py-2">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Role:</p>
            <span className="font-normal">
              {runner?.role === RUNNER_ROLES.MAKER &&
                titleCase(RUNNER_ROLES.MAKER)}
              {runner?.role === RUNNER_ROLES.CHECKER &&
                titleCase(RUNNER_ROLES.CHECKER)}
            </span>
          </div>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="py-2"
          onClick={() => {
            Authenticator.logout().then(() => location.reload());
            setRunner({} as Runner);
          }}
        >
          <p className="text-danger">Log out</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AccountButton;

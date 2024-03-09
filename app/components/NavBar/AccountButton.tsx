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
import { titleCase } from "@/services/utils";
import UserContext from "@/app/contexts/UserContext";
import { User as u } from "@/app/api/auth/user/schema";
import RunnerContext from "@/app/contexts/RunnerContext";

const AccountButton = () => {
  const { user, setUser } = useContext(UserContext);
  const { runner, setRunner } = useContext(RunnerContext);
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          className="transition-transform"
          description={user?.email}
          name={user?.full_name}
          avatarProps={{
            fallback: <AvatarIcon />,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className=" gap-2 py-2">
          <p className="font-bold">Signed in as</p>
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" className="py-2">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Is Control:</p>
            <span className="font-normal">
              {user?.is_control ? "True" : "False"}
            </span>
          </div>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="py-2"
          onClick={() => {
            Authenticator.logout().then(() => location.reload());
            setUser({} as u);
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

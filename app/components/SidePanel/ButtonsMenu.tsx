"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { BsCashCoin } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdDashboard, MdSupervisorAccount } from "react-icons/md";
import RunnerContext from "@/app/contexts/RunnerContext";
import { useContext } from "react";
import { RUNNER_ROLES } from "@/app/api/cashflow/runner/schema";

const ButtonsMenu = () => {
  const { runner, setRunner } = useContext(RunnerContext);
  const tools = [
    {
      label: "Home",
      link: "/",
      icon: <ImHome />,
      allowed: runner?.role === "m",
    },
    {
      label: "Dashboard",
      link: "/",
      icon: <MdDashboard />,
      allowed: runner?.role === "m",
    },
    {
      label: "Purchasing",
      link: "/cashflow/",
      icon: <BsCashCoin />,
      allowed: runner?.role,
    },
    {
      label: "Accounts",
      link: "/accounts/",
      icon: <MdSupervisorAccount />,
      allowed: runner?.role === "m",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {tools.map((tool) => {
        if (!tool.allowed) return;
        return (
          <Button
            className="bg-content2 rounded-md flex justify-start gap-3 text-md items-center shadow-sm"
            as={Link}
            href={tool.link}
            key={tool.label}
          >
            {tool.icon}
            {tool.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonsMenu;

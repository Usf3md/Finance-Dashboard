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
      is_maker: false,
    },
    {
      label: "Dashboard",
      link: "/",
      icon: <MdDashboard />,
      is_maker: false,
    },
    {
      label: "Cash Flow",
      link: "/cashflow/",
      icon: <BsCashCoin />,
      is_maker: false,
    },
    {
      label: "Accounts",
      link: "/accounts/",
      icon: <MdSupervisorAccount />,
      is_maker: true,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {tools.map((tool) => {
        if (tool.is_maker && runner?.role !== RUNNER_ROLES.MAKER) return;
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

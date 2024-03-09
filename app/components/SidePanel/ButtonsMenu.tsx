"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { BsCashCoin } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdDashboard, MdSupervisorAccount } from "react-icons/md";
import RunnerContext from "@/app/contexts/RunnerContext";
import { useContext } from "react";
import { RUNNER_ROLES } from "@/app/api/cashflow/runner/schema";
import UserContext from "@/app/contexts/UserContext";
import { FaDoorOpen } from "react-icons/fa6";

const ButtonsMenu = () => {
  const { user, setUser } = useContext(UserContext);
  const { runner, setRunner } = useContext(RunnerContext);
  const tools = [
    {
      label: "Home",
      link: "/",
      icon: <ImHome />,
      allowed: runner?.role === RUNNER_ROLES.CHECKER,
    },
    {
      label: "Dashboard",
      link: "/",
      icon: <MdDashboard />,
      allowed: runner?.role === RUNNER_ROLES.CHECKER,
    },
    {
      label: "Purchasing",
      link: "/cashflow/",
      icon: <BsCashCoin />,
      allowed: runner?.role,
    },
    {
      label: "Attendance",
      link: "/attendance/",
      icon: <FaDoorOpen />,
      allowed: user?.is_control,
    },
    {
      label: "Accounts",
      link: "/accounts/",
      icon: <MdSupervisorAccount />,
      allowed: runner?.role === RUNNER_ROLES.CHECKER,
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

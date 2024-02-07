"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { BsCashCoin } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdDashboard } from "react-icons/md";

const ButtonsMenu = () => {
  const tools = [
    {
      label: "Home",
      link: "/",
      icon: <ImHome />,
    },
    {
      label: "Dashboard",
      link: "/",
      icon: <MdDashboard />,
    },
    {
      label: "Cash Flow",
      link: "/cashflow/",
      icon: <BsCashCoin />,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {tools.map((tool) => (
        <>
          <Button
            className="hidden bg-transparent rounded-md lg:flex justify-start gap-3 text-md items-center bg-default-100 border-solid border-1 border-default-200"
            as={Link}
            href={tool.link}
          >
            {tool.icon}
            {tool.label}
          </Button>
          <Button
            className="lg:hidden bg-transparent rounded-md flex justify-center gap-3 text-md items-center bg-default-100 border-solid border-1 border-default-200"
            as={Link}
            href={tool.link}
            isIconOnly
          >
            {tool.icon}
          </Button>
        </>
      ))}
    </div>
  );
};

export default ButtonsMenu;

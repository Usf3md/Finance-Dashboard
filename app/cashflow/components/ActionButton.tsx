import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color:
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  href?: string;
  onClick?(): void;
  tip: string;
  className?: string;
}

const ActionButton = ({ children, color, href, tip, onClick }: Props) => {
  return (
    <>
      <Tooltip color={color} content={tip} className="capitalize" size="sm">
        {href ? (
          <Button
            isIconOnly
            as={Link}
            href={href}
            className={`bg-${color} rounded-md`}
          >
            {children}
          </Button>
        ) : (
          <Button
            onClick={onClick}
            isIconOnly
            className={`bg-${color} rounded-md`}
          >
            {children}
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default ActionButton;

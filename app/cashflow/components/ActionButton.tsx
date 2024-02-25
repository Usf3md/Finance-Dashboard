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
  size?: "sm" | "md" | "lg" | undefined;
}

const ActionButton = ({ children, color, href, tip, onClick, size }: Props) => {
  return (
    <>
      <Tooltip color={color} content={tip} className="capitalize" size="sm">
        {href ? (
          <Button
            size={size}
            isIconOnly
            as={Link}
            href={href}
            className={`bg-${color} rounded-md`}
          >
            {children}
          </Button>
        ) : (
          <Button
            size={size}
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

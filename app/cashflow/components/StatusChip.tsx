import { Chip } from "@nextui-org/react";
import React, { Children } from "react";

interface Props {
  children: React.ReactNode;
  variant:
    | "flat"
    | "dot"
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | undefined;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

const StatusChip = ({ children, color, variant }: Props) => {
  return (
    <Chip className="select-none text-xs" variant={variant} color={color}>
      {children}
    </Chip>
  );
};

export default StatusChip;

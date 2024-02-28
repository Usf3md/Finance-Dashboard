import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

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
  time: number;
  size?: "sm" | "md" | "lg" | undefined;
}

function formatTime(seconds: number) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return formattedMinutes + ":" + formattedSeconds;
}

const TimerButton = ({ children, color, href, time, onClick, size }: Props) => {
  const [passedTime, setPassedTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time - passedTime <= 0) {
        clearInterval(interval);
        return;
      }
      setPassedTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Tooltip
        color={color}
        content={formatTime(Math.max(time - passedTime, 0))}
        className="capitalize"
        size="sm"
      >
        {href ? (
          <Button
            size={size}
            isIconOnly
            as={Link}
            href={href}
            className={`bg-${color} rounded-md`}
            isDisabled={time - passedTime <= 0}
          >
            {children}
          </Button>
        ) : (
          <Button
            size={size}
            onClick={onClick}
            isIconOnly
            className={`bg-${color} rounded-md`}
            isDisabled={time - passedTime <= 0}
          >
            {children}
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default TimerButton;

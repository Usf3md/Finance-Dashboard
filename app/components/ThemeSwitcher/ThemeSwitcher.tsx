"use client";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const ThemeSwitcher = () => {
  const { themes, setTheme } = useTheme();
  const [switchState, setSwitchState] = useState(false);
  setTheme(themes[Number(switchState)]);
  return (
    <Switch
      isSelected={switchState}
      onValueChange={setSwitchState}
      size="lg"
      color="primary"
      classNames={{
        wrapper: "bg-warning",
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  );
};

export default ThemeSwitcher;

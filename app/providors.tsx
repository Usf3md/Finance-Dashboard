"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

const providors = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" themes={["light", "dark"]}>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default providors;

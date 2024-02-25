import React from "react";
import { Runner } from "../api/cashflow/runner/schema";

interface RunnerContextType {
  runner: Runner;
  setRunner: React.Dispatch<React.SetStateAction<Runner>>;
}

const RunnerContext = React.createContext<RunnerContextType>(
  {} as RunnerContextType
);

export default RunnerContext;

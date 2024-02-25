"use client";
import { Suspense, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import SidePanel from "./SidePanel";
import NavBar from "./NavBar";
import Authenticator from "@/services/auth/auth";
import LoginForm from "./LoginForm";
import FullPageSpinner from "./FullPageSpinner";
import { Runner } from "../api/cashflow/runner/schema";
import RunnerContext from "../contexts/RunnerContext";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [runner, setRunner] = useState<Runner>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Authenticator.verify().then((res) => {
      setIsLoading(false);
      setIsAuthenticated(res);
    });
  }, []);
  useEffect(() => {
    fetch("/api/cashflow/runner/me")
      .then((res) => res.json())
      .then((data: Runner) => setRunner(data));
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="h-svh">
          <FullPageSpinner />
        </div>
      ) : !isAuthenticated ? (
        <LoginForm />
      ) : (
        // @ts-ignore
        <RunnerContext.Provider value={{ runner, setRunner }}>
          <div className="grid grid-cols-iconContentGrid lg:grid-cols-contentGrid grid-rows-contentGrid h-svh">
            <SidePanel />
            <NavBar />
            <main className="overflow-auto p-10">
              <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>
            </main>
          </div>
        </RunnerContext.Provider>
      )}
    </>
  );
};

export default AuthenticationLayout;

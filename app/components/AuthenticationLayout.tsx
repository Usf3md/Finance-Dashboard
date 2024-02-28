"use client";
import { Suspense, useEffect, useState } from "react";
import SidePanel from "./SidePanel";
import NavBar from "./NavBar";
import Authenticator from "@/services/auth/auth";
import LoginForm from "./LoginForm";
import FullPageSpinner from "./FullPageSpinner";
import { Runner } from "../api/cashflow/runner/schema";
import RunnerContext from "../contexts/RunnerContext";
import MenuContext from "../contexts/MenuContext";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [runner, setRunner] = useState<Runner>();
  const [showMenu, setShowMenu] = useState(false);
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
          <div className="hidden lg:grid grid-cols-iconContentGrid lg:grid-cols-contentGrid grid-rows-contentGrid h-svh">
            <SidePanel />
            <NavBar />
            <main className="overflow-auto p-6 lg:p-10">
              <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>
            </main>
          </div>
          <MenuContext.Provider value={{ showMenu, setShowMenu }}>
            <div className="lg:hidden relative">
              <div
                className={`${
                  !showMenu && "hidden"
                } absolute  top-0 left-0 w-svw h-svh bg-content2-foreground bg-opacity-60 z-50 backdrop-blur-sm`}
                onClick={() => setShowMenu(false)}
              ></div>
              <div
                className={`${
                  !showMenu && "hidden"
                } absolute top-0 left-0 h-svh w-96 z-50`}
              >
                <SidePanel />
              </div>
              <div className="grid grid-cols-iconContentGrid lg:grid-cols-contentGrid grid-rows-contentGrid h-svh">
                <NavBar />
                <main className="overflow-auto p-6 lg:p-10">
                  <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>
                </main>
              </div>
            </div>
          </MenuContext.Provider>
        </RunnerContext.Provider>
      )}
    </>
  );
};

export default AuthenticationLayout;

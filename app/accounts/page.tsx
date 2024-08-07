"use client";
import React, { useEffect, useState } from "react";
import RunnersTable from "./components/RunnersTable";
import { RunnerService } from "@/services/clients";
import { Runner } from "../api/cashflow/runner/schema";
import ActionButton from "../components/ActionButton";
import { IoIosAdd } from "react-icons/io";
import FullPageSpinner from "../components/FullPageSpinner";

const Page = () => {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [isRunnersLoading, setIsRunnersLoading] = useState(true);
  useEffect(() => {
    RunnerService.getAll(true)
      .then((res) => {
        if (res.success) {
          setRunners(res.data);
        }
      })
      .then(() => setIsRunnersLoading(false));
  }, []);
  return (
    <>
      {isRunnersLoading ? (
        <FullPageSpinner />
      ) : (
        <article className="flex flex-col gap-4">
          <div className=" flex justify-between items-end">
            <label className=" font-bold text-2xl">Runners</label>
            <ActionButton
              color="primary"
              href={`/accounts/add`}
              tip="Add Runner"
            >
              <IoIosAdd className="text-lg" />
            </ActionButton>
          </div>
          <RunnersTable runners={runners} />
        </article>
      )}
    </>
  );
};

export default Page;

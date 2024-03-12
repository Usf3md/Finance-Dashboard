"use client";
import React, { cache, useEffect, useState } from "react";
import Member from "@/app/api/attendance/member/schema";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { convertSecondsToDuration } from "@/services/utils";
import AccordionSummary from "./AccordionSummary";
import FullPageSpinner from "@/app/components/FullPageSpinner";
import moment from "moment";
import "moment-timezone";

interface Props {
  min_date: string;
  max_date: string;
}

const PageContent = ({ min_date, max_date }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clock, setClock] = useState<Date>(new Date());
  const [start, setStart] = useState(min_date);
  const [end, setEnd] = useState(max_date);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/attendance/member/?min_date=${min_date}&max_date=${max_date}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data: Member[]) => {
        const convertedData = data.map((member) => {
          return {
            ...member,
            attendance_set: member.attendance_set
              .map((attendance) => {
                return {
                  ...attendance,
                  current_date: new Date(attendance.current_date),
                  start_datetime: attendance.start_datetime
                    ? new Date(attendance.start_datetime)
                    : undefined,
                  end_datetime: attendance.end_datetime
                    ? new Date(attendance.end_datetime)
                    : undefined,
                };
              })
              .slice()
              //@ts-ignore
              .sort((a, b) => parseInt(b.current_date - a.current_date) / 1000),
          };
        });
        setMembers(convertedData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [min_date, max_date]);
  return (
    <article className="flex flex-col gap-8">
      <div className="flex gap-4 justify-between">
        <label className=" font-bold text-2xl">Attendances</label>
        <div className="flex flex-col lg:flex-row gap-4 w-1/2 lg:items-end">
          <Input
            type="date"
            label="Start Date"
            placeholder="Select Date"
            radius="sm"
            defaultValue={min_date}
            value={start}
            onValueChange={setStart}
          />
          <Input
            type="date"
            label="End Date"
            placeholder="Select Date"
            radius="sm"
            defaultValue={max_date}
            value={end}
            onValueChange={setEnd}
          />
          <Button
            radius="sm"
            color="primary"
            onClick={() => {
              router.push(`/attendance/?min_date=${start}&max_date=${end}`);
            }}
          >
            Filter
          </Button>
        </div>
      </div>
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <Accordion variant="splitted" className="w-full">
          {members.map((member) => (
            <AccordionItem
              key={member.id}
              aria-label={member.email}
              title={<AccordionSummary member={member} />}
            >
              <div className="flex flex-col gap-6">
                {member.attendance_set.map((attendance) => (
                  <>
                    <Divider className="my-4" />
                    <div className="grid lg:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm">Shift Day</label>
                        <Chip>
                          {moment(attendance.current_date)
                            .tz("Africa/Cairo")
                            .format("MMMM Do YYYY")}
                        </Chip>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm">Leave</label>
                        {attendance.start_datetime &&
                          (attendance.end_datetime
                            ? (function () {
                                const difference =
                                  parseInt(
                                    //@ts-ignore
                                    (attendance.end_datetime -
                                      //@ts-ignore
                                      attendance.start_datetime) /
                                      1000
                                  ) - attendance.shift_duration;
                                if (difference < 0)
                                  return (
                                    <Chip color="danger" variant="flat">
                                      {convertSecondsToDuration(-difference)}
                                    </Chip>
                                  );
                                else if (difference > 0)
                                  return (
                                    <Chip color="warning" variant="flat">
                                      {convertSecondsToDuration(difference)}
                                    </Chip>
                                  );
                                return (
                                  <Chip color="success" variant="flat">
                                    Exact
                                  </Chip>
                                );
                              })()
                            : (function () {
                                const difference =
                                  parseInt(
                                    //@ts-ignore
                                    (clock - attendance.start_datetime) / 1000
                                  ) - attendance.shift_duration;
                                if (difference < 0)
                                  return (
                                    <Chip color="danger" variant="flat">
                                      {convertSecondsToDuration(-difference)}
                                    </Chip>
                                  );
                                else if (difference > 0)
                                  return (
                                    <Chip color="warning" variant="flat">
                                      {convertSecondsToDuration(difference)}
                                    </Chip>
                                  );
                                return (
                                  <Chip color="success" variant="flat">
                                    Exact
                                  </Chip>
                                );
                              })())}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm">Time Spent</label>
                        <Chip variant="flat" color="secondary">
                          <div className="flex gap-2">
                            <span>
                              {attendance.start_datetime &&
                                (attendance.end_datetime
                                  ? convertSecondsToDuration(
                                      Math.min(
                                        parseInt(
                                          //@ts-ignore
                                          (attendance.end_datetime -
                                            //@ts-ignore
                                            attendance.start_datetime) /
                                            1000
                                        ),
                                        attendance.shift_duration
                                      )
                                    )
                                  : convertSecondsToDuration(
                                      Math.min(
                                        parseInt(
                                          //@ts-ignore
                                          (clock - attendance.start_datetime) /
                                            1000
                                        ),
                                        attendance.shift_duration
                                      )
                                    ))}
                            </span>
                            /
                            <span>
                              {convertSecondsToDuration(
                                attendance.shift_duration
                              )}
                            </span>
                          </div>
                        </Chip>
                      </div>
                      <div>
                        <p className="flex flex-col gap-2">
                          <span className="text-success font-bold">
                            {attendance.start_datetime
                              ? moment(attendance.start_datetime)
                                  .tz("Africa/Cairo")
                                  .format("MMMM Do YYYY, h:mm:ss a")
                              : "UNSET"}
                          </span>
                          <span className="text-danger font-bold">
                            {attendance.end_datetime
                              ? moment(attendance.end_datetime)
                                  .tz("Africa/Cairo")
                                  .format("MMMM Do YYYY, h:mm:ss a")
                              : "UNSET"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                ))}
                <div></div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </article>
  );
};

export default PageContent;

import Member from "@/app/api/attendance/member/schema";
import { convertSecondsToDuration } from "@/services/utils";
import { AvatarIcon, Chip, User } from "@nextui-org/react";
import React from "react";

interface Props {
  member: Member;
}

const AccordionSummary = ({ member }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4 items justify-items-start items-center px-4">
      <div className="flex flex-col gap-1">
        <User
          as="button"
          className="transition-transform"
          description={member.email}
          name={member.full_name}
          avatarProps={{
            fallback: <AvatarIcon />,
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Days</label>
        <Chip variant="flat" color="warning">
          <div className="flex gap-2">
            <span>{member.attended_days}</span>/
            <span>{member.total_work_days}</span>
          </div>
        </Chip>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Time</label>
        <Chip variant="flat" color="secondary">
          <div className="flex gap-2">
            <span>{convertSecondsToDuration(member.attended_time)}</span>/
            <span>{convertSecondsToDuration(member.total_work_time)}</span>
          </div>
        </Chip>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Job</label>
        <Chip color="primary" variant="flat">
          {member.job}
        </Chip>
      </div>
    </div>
  );
};

export default AccordionSummary;

import React from "react";
import { Button } from "@nextui-org/react";
interface Props {
  email: string;
  name: string;
}

const Menu = ({ email, name }: Props) => {
  return (
    <div className="bg-default-50 border-solid border-1 border-default-200 p-4 flex gap-10 rounded-md items-center">
      <div className="flex gap-1 flex-col">
        <p>{name}</p>
        <span className=" border-solid border-1"></span>
        <p>{email}</p>
      </div>
      <div>
        <Button color="danger" className=" rounded-md">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Menu;

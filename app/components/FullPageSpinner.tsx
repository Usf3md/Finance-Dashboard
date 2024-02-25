import { Spinner } from "@nextui-org/react";
import React from "react";

const FullPageSpinner = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Spinner
        size="lg"
        className="bg-default-100 p-1 rounded-md"
        color="primary"
      />
    </div>
  );
};

export default FullPageSpinner;

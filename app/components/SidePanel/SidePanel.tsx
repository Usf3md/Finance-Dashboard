import React from "react";
import ButtonsMenu from "./ButtonsMenu";
const SidePanel = () => {
  return (
    <div className="p-4 border-solid border-r-1 border-divider bg-content1 h-full row-span-2 flex flex-col gap-8">
      <div className="font-bold text-xl h-10 flex justify-center items-center">
        <p className="hidden lg:block">Finance</p>
      </div>
      <ButtonsMenu />
    </div>
  );
};

export default SidePanel;

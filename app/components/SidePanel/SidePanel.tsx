import React, { useContext } from "react";
import ButtonsMenu from "./ButtonsMenu";
import { FaXmark } from "react-icons/fa6";
import MenuContext from "@/app/contexts/MenuContext";
const SidePanel = () => {
  const { setShowMenu } = useContext(MenuContext);
  return (
    <div className="p-4 border-solid border-r-1 border-divider bg-content1 h-full row-span-2 flex flex-col gap-8">
      <div className="relative font-bold text-xl h-10 flex justify-center items-center w-full">
        <p className="block">Finance</p>
        <FaXmark
          size={20}
          className="lg:hidden absolute end-0 cursor-pointer"
          onClick={() => setShowMenu(false)}
        />
      </div>
      <ButtonsMenu />
    </div>
  );
};

export default SidePanel;

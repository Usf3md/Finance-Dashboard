import React, { useContext } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import AccountButton from "./AccountButton";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuContext from "@/app/contexts/MenuContext";

const NavBar = () => {
  const { setShowMenu } = useContext(MenuContext);
  return (
    <nav className="flex justify-between items-center py-4 px-10 border-solid border-b-1 border-divider bg-content1">
      <div className="flex gap-8 items-center">
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          <GiHamburgerMenu size={20} />
        </div>
        <p className="font-bold text-inherit">Finance App</p>
      </div>
      <div className=" flex gap-2 items-center">
        <div>
          <ThemeSwitcher />
        </div>
        <AccountButton />
      </div>
    </nav>
  );
};
export default NavBar;

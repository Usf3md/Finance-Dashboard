import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import AccountButton from "./AccountButton";

const NavBar = () => (
  <nav className="flex justify-between items-center py-4 px-10 border-solid border-b-1 border-divider bg-content1">
    <div>
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

export default NavBar;

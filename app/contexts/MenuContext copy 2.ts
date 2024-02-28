import React from "react";
import { Runner } from "../api/cashflow/runner/schema";

interface MenuContextType {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = React.createContext<MenuContextType>({} as MenuContextType);

export default MenuContext;

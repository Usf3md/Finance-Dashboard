import React from "react";
import { User } from "../api/auth/user/schema";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;

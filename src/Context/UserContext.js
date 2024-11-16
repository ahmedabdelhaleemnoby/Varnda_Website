import { createContext } from "react";
import Cookies from "js-cookie";

export const User = createContext({});
export default function UserProvider({ children }) {
  const token = Cookies.get("token");
  return <User.Provider value={{ token }}>{children}</User.Provider>;
}
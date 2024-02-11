import { removeCookie, setCookie } from "@/lib/cookies";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export const AUTH_USER_KEY = "auth-user";
export const AUTH_TOKEN_KEY = "auth-token";

interface IAuthUserContext {
  authUser: any | undefined;
  handleAuthChange: (data: any) => void;
}

export const AuthContext = createContext({
  authUser: undefined,
  handleAuthChange: (data: any) => undefined,
} as IAuthUserContext);

export const useAuthContext = () => {
  const state = useContext(AuthContext);
  return state ?? undefined;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const getItem = localStorage.getItem(AUTH_USER_KEY) ?? "{}";
  const parsedItem = JSON.parse(getItem) ?? undefined;
  const [authUser, setAuthUser] = useState(parsedItem);

  const handleAuthChange = (data: any) => {
    if (data) {
      localStorage.setItem(AUTH_TOKEN_KEY, data?.token ?? null);
      setCookie(AUTH_USER_KEY, JSON.stringify(data) ?? null);
      setAuthUser(data ?? null);
    } else {
      //logout
      localStorage.removeItem(AUTH_TOKEN_KEY);
      removeCookie(AUTH_USER_KEY);
      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, handleAuthChange }}>
      {children}
    </AuthContext.Provider>
  );
};

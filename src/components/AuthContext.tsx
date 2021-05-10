import { createContext, FC } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

interface AuthContextOptions {
  isAuthorized: boolean;
  authToken: string | null;
  clearToken: () => void;
  setToken: (token: string) => void;
  getUserId: () => string | null;
}

export const AuthContext = createContext<AuthContextOptions>({ isAuthorized: false, authToken: null, clearToken: () => {}, setToken: () => {}, getUserId: () => null });

export const AuthContextProvider: FC = ({ children }) => {
  const { authToken, setToken, clearToken, getUserId } = useAuthToken();

  return (
    <AuthContext.Provider value={{ isAuthorized: !!authToken, authToken, setToken, getUserId, clearToken }}>
      {children}
    </AuthContext.Provider>
  )
}

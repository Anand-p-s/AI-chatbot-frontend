import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUser, checkAuthStatus, logoutUser, signupUser } from "../helpers/api";

export type User = {
  email: string;
  name: string;
};

export type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // chechking auth status when refreshed
    const chechkAuthStatus = async () => {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name })
        setIsLoggedIn(true);
      }
    }
    chechkAuthStatus();
  }, [])

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    setUser({ email: data.email, name: data.name })
    setIsLoggedIn(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {   
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)

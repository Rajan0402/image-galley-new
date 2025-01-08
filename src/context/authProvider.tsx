"use client";

import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signin: (userData: User) => void;
  signout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: { id: "", email: "" },
  signin: () => {},
  signout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = (userData: User) => {
    console.log("setting user state on signin-------------");
    setUser(userData);
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

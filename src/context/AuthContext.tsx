import React, { useState, useEffect, createContext } from "react";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmailAndPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

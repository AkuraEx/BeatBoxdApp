'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authenticateSession } from '../utils/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (value: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const res = await authenticateSession();
      if (res.user) {
        setIsAuthenticated(true);
        setUser(res.user.username);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

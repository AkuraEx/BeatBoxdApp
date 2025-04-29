'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authenticateSession, findUser } from '../utils/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  UId: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (value: string | null) => void;
  setUId: (value: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [UId, setUId] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const res = await authenticateSession();
      if (res.auth) {
        const UserRes = await findUser(res.user.username)
        setIsAuthenticated(true);
        setUser(res.user.username);
        setUId(UserRes.User[0].UId);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUId(null);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, UId, setUId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

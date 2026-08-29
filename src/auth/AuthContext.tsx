import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { mockUser } from '../data/mock';
import type { Role, SessionUser } from '../types';

interface AuthValue {
  user: SessionUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  hasAnyRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const value = useMemo<AuthValue>(() => ({
    user,
    signIn: async (email, password) => {
      void email;
      void password;
      await new Promise((resolve) => window.setTimeout(resolve, 550));
      setUser(mockUser);
    },
    signOut: () => setUser(null),
    hasAnyRole: (...roles) => Boolean(user?.roles.some((role) => roles.includes(role))),
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

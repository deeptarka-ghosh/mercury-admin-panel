/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { api, hasSession, setTokens } from '../api/client';
import type { Role, SessionUser } from '../types';

interface AuthValue {
  user: SessionUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp:string)=>Promise<void>;
  pendingChallenge:{maskedMobile:string;developmentOtp?:string}|null;
  signOut: () => void;
  hasAnyRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(()=>{if(!hasSession())return null;try{const raw=sessionStorage.getItem('mercury.admin.user');return raw?JSON.parse(raw) as SessionUser:null;}catch{return null;}});
  const [challenge,setChallenge]=useState<{id:string;maskedMobile:string;developmentOtp?:string}|null>(null);
  const value = useMemo<AuthValue>(() => ({
    user,
    signIn: async (email, password) => {
      const result=await api<{challengeId:string;maskedMobile:string;developmentOtp?:string}>('/admin/auth/login',{method:'POST',body:JSON.stringify({email,password})});setChallenge({id:result.challengeId,maskedMobile:result.maskedMobile,developmentOtp:result.developmentOtp});
    },
    verifyOtp:async(otp)=>{if(!challenge)throw new Error('No active login challenge');const result=await api<{accessToken:string;refreshToken:string;user:{id:string;email:string;roles:Role[]}}>('/admin/auth/verify-otp',{method:'POST',body:JSON.stringify({challengeId:challenge.id,otp})});setTokens({accessToken:result.accessToken,refreshToken:result.refreshToken});const sessionUser={id:result.user.id,email:result.user.email,name:result.user.email.split('@')[0]!,roles:result.user.roles};setUser(sessionUser);try{sessionStorage.setItem('mercury.admin.user',JSON.stringify(sessionUser));}catch{/* Memory session remains available. */}setChallenge(null);},
    pendingChallenge:challenge?{maskedMobile:challenge.maskedMobile,developmentOtp:challenge.developmentOtp}:null,
    signOut: () => {setTokens(null);try{sessionStorage.removeItem('mercury.admin.user');}catch{/* Ignore unavailable session storage. */}setUser(null);setChallenge(null);},
    hasAnyRole: (...roles) => Boolean(user?.roles.some((role) => roles.includes(role))),
  }), [user,challenge]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

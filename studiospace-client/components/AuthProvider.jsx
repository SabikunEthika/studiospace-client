"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const AuthCtx = createContext({ user: null, loading: true });
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [tokenUserId, setTokenUserId] = useState(null);
  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;
    if (!userId) {
      if (tokenUserId !== null) queueMicrotask(() => setTokenUserId(null));
      return;
    }
    if (tokenUserId === userId) return;
    let active = true;
    fetch("/api/token", { method: "POST" }).finally(() => {
      if (active) setTokenUserId(userId);
    });
    return () => { active = false; };
  }, [userId, isPending, tokenUserId]);

  const value = { user: session?.user || null, loading: isPending || (Boolean(userId) && tokenUserId !== userId) };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

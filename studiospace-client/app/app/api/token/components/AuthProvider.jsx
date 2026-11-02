"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const AuthCtx = createContext({ user: null, loading: true });
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [tokenReady, setTokenReady] = useState(false);
  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;
    if (!userId) { setTokenReady(true); return; }
    setTokenReady(false);
    fetch("/api/token", { method: "POST" }).finally(() => setTokenReady(true));
  }, [userId, isPending]);

  const value = { user: session?.user || null, loading: isPending || !tokenReady };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
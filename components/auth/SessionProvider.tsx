"use client";
import { createContext, useContext } from "react";

type SessionUser = {
  fname: string;
  lname: string;
  username: string;
  email: string;
  image: string;
  userType: "user" | "author";
  bio : string;
} | null;
const SessionContext = createContext<SessionUser>(null);
// the hook every client component will use
export const useSession = () => {
  return useContext(SessionContext);
};

export function SessionProvider({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
}

export default SessionProvider;



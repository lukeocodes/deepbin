import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type DefaultLayout = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayout) => {
  const session = useSession();
  const router = useRouter();

  // export default function DefaultLayout() {
  if (typeof window !== "undefined" && !session) router.push("/login");

  return <>{children}</>;
};

export default DefaultLayout;

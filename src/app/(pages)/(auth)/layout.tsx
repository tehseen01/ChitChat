"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (authStatus) {
    router.replace("/");
    return null;
  }

  return <main className="fixed inset-0 bg-white">{children}</main>;
}

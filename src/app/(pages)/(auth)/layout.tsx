"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (authStatus) {
      router.replace("/");
      return;
    }
  }, [authStatus, router]);

  return <main className="fixed inset-0 bg-white">{children}</main>;
}

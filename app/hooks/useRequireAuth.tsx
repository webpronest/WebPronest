"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export default function useRequireAuth(redirect = "/") {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirect);
    }
  }, [user, loading, router, redirect]);

  return { user, loading };
}

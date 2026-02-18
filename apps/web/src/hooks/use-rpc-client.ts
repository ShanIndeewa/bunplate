"use client";

import rpc from "core/rpc";
import { useMemo } from "react";

export function useRPCClient() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  return useMemo(() => {
    return rpc(baseUrl, {
      fetch: (input: string | URL | Request, init?: RequestInit) => {
        return fetch(input, {
          ...init,
          credentials: "include"
        });
      }
    });
  }, [baseUrl]);
}

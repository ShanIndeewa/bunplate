"use client";

import rpc from "core/rpc";
import { useMemo } from "react";

export function useRPCClient() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  return useMemo(() => {
    return rpc(baseUrl);
  }, [baseUrl]);
}

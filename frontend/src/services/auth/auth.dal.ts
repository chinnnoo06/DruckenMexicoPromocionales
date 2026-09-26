import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getToken } from "./auth.token";

export const verifySession = cache(async (): Promise<void> => {
  const token = await getToken();

  if (!token) {
    redirect("/");
  }

  const url = `${process.env.API_URL}/auth/session`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Origin: process.env.DOMAIN as string,
    },
    cache: "no-store",
  });

  if (!req.ok) {
    redirect("/");
  }
});

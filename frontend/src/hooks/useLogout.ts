"use client";

import { useQueryClient } from "@tanstack/react-query";

import { logout } from "@/actions/logout.action";
import { resetAllStores } from "@/store/resetStores";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    resetAllStores();
    queryClient.clear();
    await logout();
  };
};

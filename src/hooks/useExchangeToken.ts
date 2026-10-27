import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { ExchangeTokenResponse } from "../types/authType";

export const useExchangeToken = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      if (!data.access_token) return;
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["getRizeMusic"] });
      queryClient.invalidateQueries({ queryKey: ["playList"] });
    },
  });
};

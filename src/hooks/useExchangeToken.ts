import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import type { ExchangeTokenResponse } from "../types/authType";

export const useExchangeToken = () => {
  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

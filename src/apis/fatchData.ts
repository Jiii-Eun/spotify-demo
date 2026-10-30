import { BASE_API_URL } from "../configs/commonConfig";
import { queryClient } from "../queryClient";

export const fetchData = async <T>(
  endpoint: string,
  clientCredentialToken?: string,
  options?: RequestInit,
  hasToken: boolean = true,
): Promise<T> => {
  if (hasToken) {
    if (!clientCredentialToken) {
      throw new Error("Client credential token is not found");
    }
  }

  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method: options?.method || "GET",
      body: options?.body,
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string> | undefined),
      },
      ...options,
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${text}`);
    }
    if (response.status === 401) {
      const storedAccessToken = localStorage.getItem("access_token");

      if (storedAccessToken && clientCredentialToken === storedAccessToken) {
        localStorage.removeItem("access_token");
        queryClient.removeQueries({ queryKey: ["playList"] });
        queryClient.removeQueries({ queryKey: ["currentUserProfile"] });
      }

      throw new Error(`Request failed: ${response.status} ${text}`);
    }
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

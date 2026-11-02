import { BASE_API_URL } from "../configs/commonConfig";
import { queryClient } from "../queryClient";
import { logout } from "../utils/userAuth";

export const fetchData = async <T>(
  endpoint: string,
  clientCredentialToken?: string,
  options?: RequestInit,
  hasToken: boolean = true,
): Promise<T> => {
  if (hasToken) {
    if (!clientCredentialToken) {
      logout();
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

    if (response.status === 401) {
      const storedAccessToken = localStorage.getItem("access_token");

      if (storedAccessToken && clientCredentialToken === storedAccessToken) {
        localStorage.removeItem("access_token");
        queryClient.removeQueries({ queryKey: ["userPlaylists"] });
        queryClient.removeQueries({ queryKey: ["currentUserProfile"] });
        queryClient.removeQueries({ queryKey: ["searchResults"] });
      }

      throw new Error(`Request failed: ${response.status} ${text}`);
    }

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${text}`);
    }
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

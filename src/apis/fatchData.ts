import { BASE_API_URL } from "../configs/commonConfig";
import { queryClient } from "../queryClient";

export const fetchData = async <T>(
  endpoint: string,
  clientCredentialToken: string,
): Promise<T> => {
  if (!clientCredentialToken) {
    throw new Error("Client credential token is not found");
  }

  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    if (!response.ok) {
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

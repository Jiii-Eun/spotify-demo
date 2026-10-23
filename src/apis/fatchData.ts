import { BASE_API_URL } from "../configs/commonConfig";

export const fetchData = async <T>(
  endpoint: string,
  clientCredentialToken: string,
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${text}`);
    }
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

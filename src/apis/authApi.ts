import { CLIENT_SECRET, CLIENT_ID } from "../configs/authConfig";
import type { ClientCredentialTokenResponse } from "../types/authType";

const encodedCredentials = (data: string): string => {
  return Buffer.from(data).toString("base64");
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body,
        headers: {
          Authorization: `Basic ${encodedCredentials(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch client credential token");
    }
  };

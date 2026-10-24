import { CLIENT_SECRET, CLIENT_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import type {
  ClientCredentialTokenResponse,
  ExchangeTokenResponse,
} from "../types/authType";

const encodedCredentials = (data: string): string => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString("base64");
  }
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
      throw error;
    }
  };

export const exchangeToken = async (
  code: string,
  codeVerifier: string,
): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("CLIENT_ID or REDIRECT_URI is not set");
    }
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { generateRandomString, sha256, base64encode } from "./crypto";
import type { SpotifyAuthUrlParams } from "../types/authType";

import { CLIENT_ID, SCOPE } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URI;

  const scope = SCOPE;
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: SpotifyAuthUrlParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString();
  }
};

export default getSpotifyAuthUrl;

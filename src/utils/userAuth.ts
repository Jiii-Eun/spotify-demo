import getSpotifyAuthUrl from "./auth";
import { queryClient } from "../queryClient";

export const login = () => {
  getSpotifyAuthUrl();
};

export const logout = () => {
  localStorage.removeItem("access_token");
  queryClient.clear();
  window.dispatchEvent(new Event("auth-change"));
};

import getSpotifyAuthUrl from "./auth";
import { queryClient } from "../queryClient";

export const login = () => {
  getSpotifyAuthUrl();
};

export const logout = () => {
  localStorage.removeItem("access_token");
  queryClient.removeQueries({ queryKey: ["currentUserProfile"] });
  queryClient.removeQueries({ queryKey: ["userPlaylists"] });
  queryClient.removeQueries({ queryKey: ["playlistItems"] });
  queryClient.removeQueries({ queryKey: ["playList"] });
};

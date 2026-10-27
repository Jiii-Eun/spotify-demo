import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../apis/playlistApi";

export const usePlaylist = () => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["playList"],
    queryFn: async () => {
      return await getUserPlaylists(10, 0, accessToken as string);
    },
  });
};

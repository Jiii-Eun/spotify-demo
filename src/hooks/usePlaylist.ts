import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../apis/playlistApi";
import type { Options } from "../types/commonType";

export const usePlaylist = ({ offset, limit }: Options) => {
  const accessToken = localStorage.getItem("access_token");

  return useInfiniteQuery({
    queryKey: ["playList"],
    queryFn: ({ pageParam }) => {
      return getUserPlaylists(
        { limit, offset: pageParam },
        accessToken as string,
      );
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

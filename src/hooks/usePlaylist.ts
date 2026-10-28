import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPlaylistItems, getUserPlaylists } from "../apis/playlistApi";
import type { GetPlaylistItemsRequest } from "../types/playlistType";

export const useGetUserPlaylists = (limit: number) => {
  const accessToken = localStorage.getItem("access_token");

  return useInfiniteQuery({
    queryKey: ["userPlaylists"],
    queryFn: ({ pageParam }) => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return getUserPlaylists({ limit, offset: pageParam }, accessToken);
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

export const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["playlistItems", params.playlist_id],
    queryFn: () => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return getPlaylistItems(params, accessToken);
    },
    enabled: !!params.playlist_id,
  });
};

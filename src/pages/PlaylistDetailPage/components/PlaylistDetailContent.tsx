import type { InfiniteData } from "@tanstack/react-query";
import type { GetPlaylistItemsResponse } from "../../../types/playlistType";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { styled } from "@mui/material";
import AddTracks from "./AddTracks";
import Tracks from "./Tracks";

const ContentRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
});

export default function PlaylistDetailContent({
  id,
  playlistItems,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  id: string;
  playlistItems: InfiniteData<GetPlaylistItemsResponse>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tracks = playlistItems?.pages.flatMap((page) => page.items);

  const trackTotal = tracks?.length;

  return (
    <ContentRoot id={id}>
      {trackTotal === 0 ? <AddTracks /> : <Tracks tracks={tracks} ref={ref} />}
    </ContentRoot>
  );
}

import { styled } from "@mui/material";
import type { InfiniteData } from "@tanstack/react-query";
import type { PlaylistResponse } from "../../../../types/playlistType";
import PlayListCard from "./PlayListCard";

const PlayListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  minWidth: 0,
});

export default function PlayList({
  data,
}: {
  data: InfiniteData<PlaylistResponse>;
}) {
  return (
    <PlayListContainer>
      {data?.pages[0]?.items.map((playlist) => (
        <PlayListCard key={playlist.id} playlist={playlist} />
      ))}
    </PlayListContainer>
  );
}

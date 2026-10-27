import { styled } from "@mui/material";
import type { InfiniteData } from "@tanstack/react-query";
import type { PlaylistResponse } from "../../../../types/playlistType";
import PlayListCard from "./PlayListCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlayListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  minWidth: 0,
});

export default function PlayList({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  data: InfiniteData<PlaylistResponse>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <PlayListContainer>
      {data.pages.flatMap((page) =>
        page.items.map((playlist) => (
          <PlayListCard
            key={playlist.id}
            playlist={playlist}
            handleClick={handleClick}
            id={playlist.id}
          />
        )),
      )}
      <div ref={ref} />
    </PlayListContainer>
  );
}

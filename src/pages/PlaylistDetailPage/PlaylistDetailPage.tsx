import { Navigate, useParams } from "react-router-dom";
import { useGetPlaylistItems } from "../../hooks/usePlaylist";
import PlaylistDetailContent from "./components/PlaylistDetailContent";
import PlaylistDetailFooter from "./components/PlaylistDetailFooter";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import type { InfiniteData } from "@tanstack/react-query";
import type { GetPlaylistItemsResponse } from "../../types/playlistType";
import { styled } from "@mui/material";

const PageRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
});

const HeaderSection = styled("div")({
  flexShrink: 0,
  width: "100%",
  minWidth: 0,
});

const FooterSection = styled("div")({
  flexShrink: 0,
  width: "100%",
  minWidth: 0,
});

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: id ?? "",
    limit: 10,
  });

  if (!id) return <Navigate to="/" />;

  if (isPlaylistItemsLoading) return <LoadingSpinner />;
  if (playlistItemsError)
    return <ErrorMessage message={playlistItemsError.message} />;

  return (
    <PageRoot>
      <HeaderSection>
        <PlaylistDetailHeader id={id} playlistItems={playlistItems?.pages[0]} />
      </HeaderSection>
      <PlaylistDetailContent
        id={id}
        playlistItems={playlistItems as InfiniteData<GetPlaylistItemsResponse>}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <FooterSection>
        <PlaylistDetailFooter id={id} />
      </FooterSection>
    </PageRoot>
  );
}

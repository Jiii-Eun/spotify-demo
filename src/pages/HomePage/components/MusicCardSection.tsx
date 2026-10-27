import styled from "@emotion/styled";
import MusicCardList from "./MusicCardList";
import { Typography } from "@mui/material";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { useGetSearchAlbums } from "../../../hooks/useAlbums";
import type { SearchAlbum } from "../../../types/searchType";

// import HomeMock from "../HomeMock.json";
// import type { AlbumResponse } from "../../../types/apiType";

const RizeMusic = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

// const data = HomeMock as AlbumResponse;

const RizeMusics = () => {
  const { data, isLoading, error } = useGetSearchAlbums();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return <MusicCardList albums={data?.albums.items || []} />;
};

export default function MusicCardSection({ title }: { title: string }) {
  return (
    <RizeMusic>
      <Typography variant="h3">{title}</Typography>
      <RizeMusics />
      {/* <MusicCardList albums={data.albums.items || []} /> */}
    </RizeMusic>
  );
}

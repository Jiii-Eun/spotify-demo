import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetSearchAlbums } from "../../../hooks/useAlbums";
import MusicCardList from "./MusicCardList";

const SectionRoot = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const RisingAlbums = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSearchAlbums();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <MusicCardList
      albums={data?.albums.items || []}
      onAlbumClick={(album) => navigate(`/album/${album.id}`)}
    />
  );
};

export default function MusicCardSection({ title }: { title: string }) {
  return (
    <SectionRoot>
      <Typography variant="h3">{title}</Typography>
      <RisingAlbums />
    </SectionRoot>
  );
}

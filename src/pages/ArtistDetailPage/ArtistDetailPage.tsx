import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetArtist, useGetArtistTopTracks } from "../../hooks/useTrack";
import ArtistDetailContents from "./components/ArtistDetailContents";
import ArtistDetailHeader from "./components/ArtistDetailHeader";

const Page = styled("div")({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function ArtistDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: artist, isLoading, error } = useGetArtist(id);
  const {
    data: topTracks,
    isLoading: tracksLoading,
    error: tracksError,
  } = useGetArtistTopTracks(id);

  if (isLoading || tracksLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (tracksError) return <ErrorMessage message={tracksError.message} />;
  if (!artist)
    return <ErrorMessage message="아티스트 정보를 찾을 수 없습니다." />;

  return (
    <Page>
      <ArtistDetailHeader artist={artist} />
      <ArtistDetailContents tracks={topTracks?.tracks ?? []} />
    </Page>
  );
}

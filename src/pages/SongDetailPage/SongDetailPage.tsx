import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetArtist, useGetTrack } from "../../hooks/useTrack";
import SongDetailContents from "./components/SongDetailContents";
import SongDetailHeader from "./components/SongDetailHeader";

const Page = styled("div")({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function SongDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: track, isLoading, error } = useGetTrack(id);
  const primaryArtistId = track?.artists?.[0]?.id ?? "";
  const { data: artist } = useGetArtist(primaryArtistId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!track) return <ErrorMessage message="곡 정보를 찾을 수 없습니다." />;

  return (
    <Page>
      <SongDetailHeader track={track} artist={artist} />
      <SongDetailContents track={track} artist={artist} />
    </Page>
  );
}

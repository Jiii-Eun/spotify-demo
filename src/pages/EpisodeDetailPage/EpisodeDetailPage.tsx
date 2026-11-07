import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetEpisode } from "../../hooks/useShow";
import EpisodeDetailContents from "./components/EpisodeDetailContents";
import EpisodeDetailHeader from "./components/EpisodeDetailHeader";

const Page = styled("div")({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function EpisodeDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: episode, isLoading, error } = useGetEpisode(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!episode)
    return <ErrorMessage message="에피소드 정보를 찾을 수 없습니다." />;

  return (
    <Page>
      <EpisodeDetailHeader episode={episode} />
      <EpisodeDetailContents episode={episode} />
    </Page>
  );
}

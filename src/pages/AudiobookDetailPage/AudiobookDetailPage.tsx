import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetAudiobook } from "../../hooks/useAudiobook";
import AudiobookDetailContents from "./components/AudiobookDetailContents";
import AudiobookDetailHeader from "./components/AudiobookDetailHeader";

const Page = styled("div")({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function AudiobookDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: audiobook, isLoading, error } = useGetAudiobook(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!audiobook)
    return <ErrorMessage message="오디오북 정보를 찾을 수 없습니다." />;

  return (
    <Page>
      <AudiobookDetailHeader audiobook={audiobook} />
      <AudiobookDetailContents audiobook={audiobook} />
    </Page>
  );
}

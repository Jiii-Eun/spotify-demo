import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetShow } from "../../hooks/useShow";
import ShowDetailContents from "./components/ShowDetailContents";
import ShowDetailHeader from "./components/ShowDetailHeader";

const Page = styled("div")({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function ShowDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: show, isLoading, error } = useGetShow(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!show) return <ErrorMessage message="쇼 정보를 찾을 수 없습니다." />;

  return (
    <Page>
      <ShowDetailHeader show={show} />
      <ShowDetailContents show={show} />
    </Page>
  );
}

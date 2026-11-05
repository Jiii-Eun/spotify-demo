import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetSearchResults } from "../../hooks/useSearch";
import type { SearchResponse } from "../../types/searchType";
import Songs from "./components/Songs";
import TopResult, { type TopResultItem } from "./components/TopResult";
import Artist from "../../common/components/SlideList/Artist";
import Albums from "../../common/components/SlideList/Albums";

const Page = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: "16px 0 48px",
  boxSizing: "border-box",
});

const TopGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

function pickTopResult(data?: SearchResponse): TopResultItem | null {
  if (!data) return null;

  const track = data.tracks?.items?.[0];
  if (track) return { kind: "track", data: track };

  const artist = data.artists?.items?.[0];
  if (artist) return { kind: "artist", data: artist };

  const album = data.albums?.items?.[0];
  if (album) return { kind: "album", data: album };

  return null;
}

export default function SearchResultPage() {
  const { query } = useParams<{ query: string }>();
  const q = query ? decodeURIComponent(query) : "";

  const { data, isLoading, error } = useGetSearchResults(q);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const tracks = data?.tracks?.items ?? [];
  const artists = data?.artists?.items ?? [];
  const albums = data?.albums?.items ?? [];
  const topItem = pickTopResult(data);

  const isEmpty =
    !tracks.length && !artists.length && !albums.length && !topItem;

  if (isEmpty) {
    return (
      <Page>
        <Typography color="text.secondary">
          “{q}”에 대한 검색 결과가 없습니다.
        </Typography>
      </Page>
    );
  }

  return (
    <Page>
      <TopGrid>
        <TopResult item={topItem} />
        <Songs tracks={tracks.slice(0, 4)} />
      </TopGrid>
      <Artist artists={artists} />
      <Albums albums={albums} />
    </Page>
  );
}

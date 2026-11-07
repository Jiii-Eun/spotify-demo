import { styled } from "@mui/material/styles";
import Albums from "../../common/components/SlideList/Albums";
import Artist from "../../common/components/SlideList/Artist";
import Audiobooks from "../../common/components/SlideList/Audiobooks";
import Episodes from "../../common/components/SlideList/Episodes";
import Shows from "../../common/components/SlideList/Shows";
import {
  HOME_SECTION_LIMIT,
  HOME_SECTION_QUERIES,
} from "../../configs/homeConfig";
import { useGetHomeSection } from "../../hooks/useSearch";
import MusicCardSection from "./components/MusicCardSection";

const MusicCardSectionContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 32,
  paddingBottom: 48,
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    gap: 24,
    paddingBottom: 32,
  },
}));

export default function HomePage() {
  const artistsQuery = useGetHomeSection(
    HOME_SECTION_QUERIES.artists.type,
    HOME_SECTION_QUERIES.artists.q,
    HOME_SECTION_LIMIT,
  );
  const albumsQuery = useGetHomeSection(
    HOME_SECTION_QUERIES.albums.type,
    HOME_SECTION_QUERIES.albums.q,
    HOME_SECTION_LIMIT,
  );
  const showsQuery = useGetHomeSection(
    HOME_SECTION_QUERIES.shows.type,
    HOME_SECTION_QUERIES.shows.q,
    HOME_SECTION_LIMIT,
  );
  const episodesQuery = useGetHomeSection(
    HOME_SECTION_QUERIES.episodes.type,
    HOME_SECTION_QUERIES.episodes.q,
    HOME_SECTION_LIMIT,
  );
  const audiobooksQuery = useGetHomeSection(
    HOME_SECTION_QUERIES.audiobooks.type,
    HOME_SECTION_QUERIES.audiobooks.q,
    HOME_SECTION_LIMIT,
  );

  const artists =
    artistsQuery.data?.artists?.items?.filter(Boolean) ?? [];
  const albums = albumsQuery.data?.albums?.items?.filter(Boolean) ?? [];
  const shows = showsQuery.data?.shows?.items?.filter(Boolean) ?? [];
  const episodes =
    episodesQuery.data?.episodes?.items?.filter(Boolean) ?? [];
  const audiobooks =
    audiobooksQuery.data?.audiobooks?.items?.filter(Boolean) ?? [];

  return (
    <MusicCardSectionContainer>
      <MusicCardSection title="인기 상승 곡" />
      <Artist artists={artists} />
      <Albums albums={albums} />
      <Shows shows={shows} />
      <Episodes episodes={episodes} />
      <Audiobooks audiobooks={audiobooks} />
    </MusicCardSectionContainer>
  );
}

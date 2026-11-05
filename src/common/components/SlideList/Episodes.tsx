import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SearchEpisode } from "../../../types/searchType";
import SlideSquareList from "./SlideSquareList";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

type EpisodesProps = {
  episodes: SearchEpisode[];
};

export default function Episodes({ episodes }: EpisodesProps) {
  if (!episodes.length) return null;

  const items = episodes.map((episode) => ({
    id: episode.id,
    imageUrl: episode.images?.[0]?.url ?? "",
    title: episode.name,
    subtitle: "에피소드",
  }));

  return (
    <Section>
      <Typography variant="h3">에피소드</Typography>
      <SlideSquareList items={items} />
    </Section>
  );
}

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SearchAlbum } from "../../../types/searchType";
import MusicCardList from "../../../pages/HomePage/components/MusicCardList";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

type AlbumsProps = {
  albums: SearchAlbum[];
};

export default function Albums({ albums }: AlbumsProps) {
  if (!albums.length) return null;

  return (
    <Section>
      <Typography variant="h3">앨범</Typography>
      <MusicCardList albums={albums} />
    </Section>
  );
}

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MusicCardList from "../../../pages/HomePage/components/MusicCardList";
import type { SearchAlbum } from "../../../types/searchType";

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
  const navigate = useNavigate();

  if (!albums.length) return null;

  return (
    <Section>
      <Typography variant="h3">앨범</Typography>
      <MusicCardList
        albums={albums}
        onAlbumClick={(album) => navigate(`/album/${album.id}`)}
      />
    </Section>
  );
}

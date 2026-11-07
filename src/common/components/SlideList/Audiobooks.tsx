import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { SearchAudiobooks } from "../../../types/searchType";
import SlideSquareList from "./SlideSquareList";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

type AudiobooksProps = {
  audiobooks: SearchAudiobooks[];
};

export default function Audiobooks({ audiobooks }: AudiobooksProps) {
  const navigate = useNavigate();

  if (!audiobooks.length) return null;

  const items = audiobooks.map((book) => ({
    id: book.id,
    imageUrl: book.images?.[0]?.url ?? "",
    title: book.name,
    subtitle:
      book.authors?.map((author) => author.name).filter(Boolean).join(", ") ||
      "오디오북",
  }));

  return (
    <Section>
      <Typography variant="h3">오디오북</Typography>
      <SlideSquareList
        items={items}
        onItemClick={(item) => navigate(`/audiobook/${item.id}`)}
      />
    </Section>
  );
}

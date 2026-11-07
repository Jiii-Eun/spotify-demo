import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { SearchShow } from "../../../types/searchType";
import SlideSquareList from "./SlideSquareList";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

type ShowsProps = {
  shows: SearchShow[];
};

export default function Shows({ shows }: ShowsProps) {
  const navigate = useNavigate();

  if (!shows.length) return null;

  const items = shows.map((show) => ({
    id: show.id,
    imageUrl: show.images?.[0]?.url ?? "",
    title: show.name,
    subtitle: show.publisher || "쇼",
  }));

  return (
    <Section>
      <Typography variant="h3">쇼</Typography>
      <SlideSquareList
        items={items}
        onItemClick={(item) => navigate(`/show/${item.id}`)}
      />
    </Section>
  );
}

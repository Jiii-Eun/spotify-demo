import MusicCardSection from "./components/MusicCardSection";
import { styled } from "@mui/material/styles";

const MusicCardSectionContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function HomePage() {
  return (
    <MusicCardSectionContainer>
      <MusicCardSection title="인기 상승 곡" />
    </MusicCardSectionContainer>
  );
}

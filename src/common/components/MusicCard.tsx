import { alpha, styled } from "@mui/material/styles";
import PlayButton from "./PlayButton";
import type { MusicCardProps } from "../../types/cardType";

const CARD_COLORS = ["primary", "info", "warning", "success", "error"] as const;

const CardRoot = styled("div")({
  position: "relative",
  width: "100%",
  padding: "12px",
});

const CardBackground = styled("div", {
  shouldForwardProp: (prop) => prop !== "colorIndex",
})<{ colorIndex: number }>(({ theme, colorIndex }) => {
  const colorKey = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return {
    position: "absolute",
    inset: 0,
    borderRadius: 12,
    backgroundColor: alpha(theme.palette[colorKey].main, 0.9),
    opacity: 0,
    transform: "scale(0.94)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: "none",
    ".music-card:hover &": {
      opacity: 1,
      transform: "scale(1)",
    },
  };
});

const CardBody = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const CoverFrame = styled("div")({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
});

const Cover = styled("img")({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
});

const Title = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const ArtistName = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export default function MusicCard({ album, index }: MusicCardProps) {
  const coverUrl = album.images[0]?.url ?? "";
  const artistName = album.artists[0]?.name ?? "";

  return (
    <CardRoot className="music-card">
      <CardBackground className="card-background" colorIndex={index} />
      <CardBody>
        <CoverFrame>
          <Cover src={coverUrl} alt={album.name} />
          <PlayButton />
        </CoverFrame>
        <Title>{album.name}</Title>
        <ArtistName>{artistName}</ArtistName>
      </CardBody>
    </CardRoot>
  );
}

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { SpotifyEpisode } from "../../../types/showType";

const HeaderRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 16,
  width: "100%",
  minWidth: 0,
  minHeight: 220,
  padding: "32px 24px 28px",
  boxSizing: "border-box",
  background: `linear-gradient(
    180deg,
    ${theme.palette.primary.main}99 0%,
    ${theme.palette.background.paper} 100%
  )`,
  [theme.breakpoints.down("sm")]: {
    minHeight: 180,
    padding: "24px 12px 20px",
    gap: 12,
  },
}));

const TypeLabel = styled("div")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: theme.palette.text.primary,
  opacity: 0.9,
}));

const Title = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: 40,
  fontWeight: 900,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  maxWidth: 900,
  [theme.breakpoints.down("md")]: {
    fontSize: 28,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 22,
  },
}));

const ShowRow = styled("button")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme.palette.text.primary,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ShowThumb = styled("img")(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 4,
  objectFit: "cover",
  backgroundColor: theme.palette.background.black200,
}));

const ShowName = styled("span")({
  fontSize: 15,
  fontWeight: 700,
});

type EpisodeDetailHeaderProps = {
  episode: SpotifyEpisode;
};

export default function EpisodeDetailHeader({
  episode,
}: EpisodeDetailHeaderProps) {
  const navigate = useNavigate();
  const showName = episode.show?.name ?? "";
  const showImage = episode.show?.images?.[0]?.url ?? "";

  return (
    <HeaderRoot>
      <TypeLabel>팟캐스트 에피소드</TypeLabel>
      <Title>{episode.name}</Title>
      {showName ? (
        <ShowRow
          type="button"
          onClick={() => navigate(`/search/${encodeURIComponent(showName)}`)}
        >
          {showImage ? <ShowThumb src={showImage} alt={showName} /> : null}
          <ShowName>{showName}</ShowName>
        </ShowRow>
      ) : null}
    </HeaderRoot>
  );
}

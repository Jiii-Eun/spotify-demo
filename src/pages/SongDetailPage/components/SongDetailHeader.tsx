import { Avatar, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { SpotifyArtist, Track } from "../../../types/trackType";

const HeaderRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 24,
  width: "100%",
  minWidth: 0,
  padding: "24px 24px 28px",
  boxSizing: "border-box",
  background: `linear-gradient(
    180deg,
    ${theme.palette.primary.main}55 0%,
    ${theme.palette.background.paper} 100%
  )`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    padding: "16px 12px 20px",
  },
}));

const Cover = styled("img")(({ theme }) => ({
  width: 232,
  height: 232,
  borderRadius: 8,
  objectFit: "cover",
  flexShrink: 0,
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  backgroundColor: theme.palette.background.black200,
  [theme.breakpoints.down("md")]: {
    width: 180,
    height: 180,
  },
  [theme.breakpoints.down("sm")]: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
}));

const Info = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 12,
  minWidth: 0,
  flex: 1,
  paddingBottom: 4,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const TypeLabel = styled("div")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const Title = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: 56,
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    fontSize: 36,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 28,
    whiteSpace: "normal",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
}));

const Meta = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
  flexWrap: "wrap",
});

const ArtistButton = styled("button")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme.palette.text.primary,
  font: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ArtistAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  fontSize: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const MetaStrong = styled("span")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const MetaText = styled("span")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type SongDetailHeaderProps = {
  track: Track;
  artist?: SpotifyArtist;
};

export default function SongDetailHeader({
  track,
  artist,
}: SongDetailHeaderProps) {
  const navigate = useNavigate();
  const coverUrl = track.album?.images?.[0]?.url ?? "";
  const primaryArtist = track.artists?.[0];
  const artistName = primaryArtist?.name ?? artist?.name ?? "";
  const artistImage = artist?.images?.[0]?.url;
  const year = track.album?.release_date?.slice(0, 4) ?? "";
  const albumName = track.album?.name ?? "";

  const goArtist = () => {
    const artistId = primaryArtist?.id ?? artist?.id;
    if (!artistId) return;
    navigate(`/artist/${artistId}`);
  };

  return (
    <HeaderRoot>
      <Cover src={coverUrl} alt={track.name} />
      <Info>
        <TypeLabel>곡</TypeLabel>
        <Title>{track.name}</Title>
        <Meta>
          {artistName ? (
            <ArtistButton type="button" onClick={goArtist}>
              <ArtistAvatar src={artistImage} alt={artistName} />
              <MetaStrong>{artistName}</MetaStrong>
            </ArtistButton>
          ) : null}
          {albumName ? (
            <>
              <MetaText>•</MetaText>
              <MetaText>{albumName}</MetaText>
            </>
          ) : null}
          {year ? (
            <>
              <MetaText>•</MetaText>
              <MetaText>{year}</MetaText>
            </>
          ) : null}
          <MetaText>•</MetaText>
          <MetaText>{formatDuration(track.duration_ms)}</MetaText>
        </Meta>
      </Info>
    </HeaderRoot>
  );
}

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/material";
import type { Playlist } from "../../../../types/playlistType";

const CardRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: 8,
  borderRadius: 8,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
    "& .playlist-cover-overlay": {
      opacity: 1,
    },
    "& .playlist-cover-image": {
      filter: "brightness(0.55)",
    },
  },
}));

const Cover = styled("div")(({ theme }) => ({
  position: "relative",
  flexShrink: 0,
  width: 48,
  height: 48,
  borderRadius: 4,
  overflow: "hidden",
  backgroundColor: theme.palette.background.black200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "filter 0.2s ease",
});

const CoverPlaceholderIcon = styled(MusicNoteIcon)(({ theme }) => ({
  fontSize: 28,
  color: theme.palette.text.secondary,
}));

const CoverOverlay = styled("div", {
  shouldForwardProp: (prop) => prop !== "hasCover",
})<{ hasCover: boolean }>(({ hasCover }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.2s ease",
  backgroundColor: hasCover ? "transparent" : "rgba(0, 0, 0, 0.35)",
}));

const PlayIcon = styled(PlayArrowIcon)(({ theme }) => ({
  fontSize: 28,
  color: theme.palette.secondary.main,
}));

const TextBlock = styled("div")({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const Title = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.3,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const Subtitle = styled("div")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 400,
  lineHeight: 1.3,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export default function PlayListCard({
  playlist,
  handleClick,
  id,
}: {
  playlist: Playlist;
  handleClick: (id: string) => void;
  id: string;
}) {
  const coverUrl = playlist.images?.[0]?.url;
  const ownerName = playlist.owner.display_name ?? playlist.owner.id;

  return (
    <CardRoot onClick={() => handleClick(id)}>
      <Cover>
        {coverUrl ? (
          <CoverImage
            className="playlist-cover-image"
            src={coverUrl}
            alt={playlist.name}
          />
        ) : (
          <CoverPlaceholderIcon />
        )}
        <CoverOverlay className="playlist-cover-overlay" hasCover={!!coverUrl}>
          <PlayIcon />
        </CoverOverlay>
      </Cover>

      <TextBlock>
        <Title>{playlist.name}</Title>
        <Subtitle>플레이리스트 • {ownerName}</Subtitle>
      </TextBlock>
    </CardRoot>
  );
}

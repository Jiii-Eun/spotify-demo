import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Alert,
  Avatar,
  IconButton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_LYRICS } from "../../../configs/mockLyrics";
import type { SpotifyArtist, Track } from "../../../types/trackType";
import PlaylistDropbox from "../../SearchResultPage/components/PlaylistDropbox";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: "24px 24px 48px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 12px 40px",
    gap: 24,
  },
}));

const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
  position: "relative",
});

const PlayCircle = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(1.08)",
  },
}));

const PlusCircle = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `1.5px solid ${theme.palette.text.secondary}`,
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
}));

const LyricsSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  maxWidth: 560,
});

const LyricsBody = styled("div", {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  color: theme.palette.text.primary,
  fontSize: 15,
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  ...(expanded
    ? {}
    : {
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }),
}));

const ExpandButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: 700,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ArtistCard = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: 12,
  maxWidth: 420,
  border: "none",
  borderRadius: 8,
  background: "transparent",
  cursor: "pointer",
  textAlign: "left",
  color: "inherit",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
}));

const ArtistImage = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.background.black200,
}));

const ArtistInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
});

type SongDetailContentsProps = {
  track: Track;
  artist?: SpotifyArtist;
};

export default function SongDetailContents({
  track,
  artist,
}: SongDetailContentsProps) {
  const navigate = useNavigate();
  const plusRootRef = useRef<HTMLDivElement>(null);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);
  const [dropboxOpen, setDropboxOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "error" | "success";
    message: string;
  }>({ open: false, severity: "error", message: "" });

  const artistId = track.artists?.[0]?.id ?? artist?.id ?? "";
  const artistName = track.artists?.[0]?.name ?? artist?.name ?? "";
  const artistImage = artist?.images?.[0]?.url;

  useEffect(() => {
    if (!dropboxOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!plusRootRef.current?.contains(event.target as Node)) {
        setDropboxOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropboxOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropboxOpen]);

  const goArtist = () => {
    if (!artistId) return;
    navigate(`/artist/${artistId}`);
  };

  const handlePlusClick = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setDropboxOpen(false);
      setToast({
        open: true,
        severity: "error",
        message: "로그인 후 이용해주세요",
      });
      return;
    }
    setDropboxOpen((prev) => !prev);
  };

  return (
    <Root>
      <Actions>
        <PlayCircle aria-label="재생">
          <PlayArrowIcon sx={{ fontSize: 32 }} />
        </PlayCircle>
        <div ref={plusRootRef}>
          <PlusCircle aria-label="플레이리스트에 추가" onClick={handlePlusClick}>
            <AddIcon fontSize="small" />
          </PlusCircle>
          {dropboxOpen ? (
            <PlaylistDropbox
              trackUri={track.uri}
              anchorEl={plusRootRef.current}
              onClose={() => setDropboxOpen(false)}
              onAdded={() =>
                setToast({
                  open: true,
                  severity: "success",
                  message: "플레이리스트에 추가되었습니다",
                })
              }
            />
          ) : null}
        </div>
      </Actions>

      <LyricsSection>
        <Typography variant="h3">가사</Typography>
        <LyricsBody expanded={lyricsExpanded}>{MOCK_LYRICS}</LyricsBody>
        <ExpandButton
          type="button"
          onClick={() => setLyricsExpanded((prev) => !prev)}
        >
          {lyricsExpanded ? "접기" : "...더 표시하기"}
        </ExpandButton>
      </LyricsSection>

      {artistName ? (
        <ArtistCard type="button" onClick={goArtist}>
          <ArtistImage src={artistImage} alt={artistName} />
          <ArtistInfo>
            <Typography variant="body2" color="text.secondary">
              아티스트
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
              {artistName}
            </Typography>
          </ArtistInfo>
        </ArtistCard>
      ) : null}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Root>
  );
}

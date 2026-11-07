import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SpotifyEpisode } from "../../../types/showType";
import PlaylistDropbox from "../../SearchResultPage/components/PlaylistDropbox";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  padding: "20px 24px 48px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 12px 40px",
    gap: 22,
  },
}));

const Meta = styled("div")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}));

const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
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

const PlusWrap = styled("div")({
  position: "relative",
});

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

const DescriptionSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  maxWidth: 640,
});

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

type EpisodeDetailContentsProps = {
  episode: SpotifyEpisode;
};

export default function EpisodeDetailContents({
  episode,
}: EpisodeDetailContentsProps) {
  const navigate = useNavigate();
  const plusRootRef = useRef<HTMLDivElement>(null);
  const [dropboxOpen, setDropboxOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "error" | "success";
    message: string;
  }>({ open: false, severity: "error", message: "" });

  useEffect(() => {
    if (!dropboxOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!plusRootRef.current?.contains(event.target as Node)) {
        setDropboxOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropboxOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropboxOpen]);

  const dateLabel = formatDate(episode.release_date);
  const durationLabel = formatDuration(episode.duration_ms);
  const showId = episode.show?.id;

  return (
    <Root>
      <Meta>
        {[dateLabel, durationLabel].filter(Boolean).join(" • ")}
      </Meta>

      <Actions>
        <PlayCircle aria-label="재생">
          <PlayArrowIcon sx={{ fontSize: 32 }} />
        </PlayCircle>
        <PlusWrap ref={plusRootRef}>
          <PlusCircle
            aria-label="플레이리스트에 추가"
            onClick={() => {
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
            }}
          >
            <AddIcon fontSize="small" />
          </PlusCircle>
          {dropboxOpen ? (
            <PlaylistDropbox
              trackUri={episode.uri}
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
        </PlusWrap>
      </Actions>

      <DescriptionSection>
        <Typography variant="h3">에피소드 설명</Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: 14, lineHeight: 1.7 }}
        >
          {episode.description || "설명이 없습니다."}
        </Typography>
      </DescriptionSection>

      {showId ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/show/${showId}`)}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 700,
            px: 2.5,
          }}
        >
          에피소드 모두 보기
        </Button>
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

import { Alert, IconButton, Snackbar, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PlaylistDropbox from "./PlaylistDropbox";
import AddIcon from "@mui/icons-material/Add";

const Root = styled("div")({
  position: "relative",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
});

const PlusButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "transparent",
    filter: "brightness(1.15)",
  },
}));

type SongPlusIconProps = {
  trackUri: string;
  onOpenChange?: (open: boolean) => void;
};

export default function SongPlusIcon({
  trackUri,
  onOpenChange,
}: SongPlusIconProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const setDropboxOpen = (next: boolean) => {
    setOpen(next);
    onOpenChangeRef.current?.(next);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
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
  }, [open]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setDropboxOpen(false);
      setToastOpen(true);
      return;
    }
    setDropboxOpen(!open);
  };

  return (
    <Root ref={rootRef} className="song-plus">
      <PlusButton
        aria-label="플레이리스트에 추가"
        aria-expanded={open}
        onClick={handleClick}
        size="small"
      >
        <AddIcon
          fontSize="small"
          sx={{
            border: "1.5px solid",
            borderColor: "primary.main",
            borderRadius: "50%",
          }}
        />
      </PlusButton>

      {open ? (
        <PlaylistDropbox
          trackUri={trackUri}
          onClose={() => setDropboxOpen(false)}
        />
      ) : null}

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setToastOpen(false)}
        >
          로그인 후 이용해주세요
        </Alert>
      </Snackbar>
    </Root>
  );
}

import AddIcon from "@mui/icons-material/Add";
import { Alert, IconButton, Snackbar, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PlaylistDropbox from "./PlaylistDropbox";

const Root = styled("div")({
  position: "relative",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
});

const PlusButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: theme.palette.text.primary,
  "& .song-plus-icon": {
    border: "1.5px solid currentColor",
    borderRadius: "50%",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  },
}));

type ToastState = {
  open: boolean;
  severity: "error" | "success";
  message: string;
};

type SongPlusIconProps = {
  trackUri: string;
  onOpenChange?: (open: boolean) => void;
};

export default function SongPlusIcon({
  trackUri,
  onOpenChange,
}: SongPlusIconProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    severity: "error",
    message: "",
  });

  const setDropboxOpen = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;

    const close = () => {
      setOpen(false);
      onOpenChange?.(false);
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = rootRef.current?.contains(target);
      const inMenu =
        target instanceof Element &&
        Boolean(target.closest('[role="menu"]'));
      if (!inTrigger && !inMenu) close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    setDropboxOpen(!open);
  };

  const handleAdded = () => {
    setToast({
      open: true,
      severity: "success",
      message: "플레이리스트에 추가되었습니다",
    });
  };

  return (
    <Root ref={rootRef} className="song-plus">
      <PlusButton
        aria-label="플레이리스트에 추가"
        aria-expanded={open}
        onClick={handleClick}
        size="small"
      >
        <AddIcon fontSize="small" className="song-plus-icon" />
      </PlusButton>

      {open ? (
        <PlaylistDropbox
          trackUri={trackUri}
          anchorEl={rootRef.current}
          onClose={() => setDropboxOpen(false)}
          onAdded={handleAdded}
        />
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

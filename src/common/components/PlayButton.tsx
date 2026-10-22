import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton } from "@mui/material";

export default function PlayButton() {
  return (
    <IconButton
      aria-label="재생"
      sx={(theme) => ({
        position: "absolute",
        right: 8,
        bottom: 8,
        zIndex: 1,
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        opacity: 0,
        transform: "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        ".music-card:hover &": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          filter: "brightness(1.08)",
        },
      })}
    >
      <PlayArrowIcon />
    </IconButton>
  );
}

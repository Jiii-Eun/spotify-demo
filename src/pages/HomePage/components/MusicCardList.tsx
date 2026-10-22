import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import MusicCard from "../../../common/components/MusicCard";
import type { MusicCardListProps } from "../../../types/cardType";

const CARD_STEP = 196;

const ListRoot = styled("div")({
  position: "relative",
});

const Scroller = styled("div")({
  overflowX: "auto",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export default function MusicCardList({ albums }: MusicCardListProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowLeft(el.scrollLeft > 1);
    setShowRight(maxScroll > 1 && el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [albums]);

  const scrollByCard = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * CARD_STEP,
      behavior: "smooth",
    });
  };

  const arrowSx =
    (visible: boolean) =>
    (theme: {
      palette: {
        background: { black200: string; black100: string };
        text: { primary: string };
      };
    }) => ({
      position: "absolute" as const,
      top: "32%",
      zIndex: 2,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: theme.palette.background.black200,
      color: theme.palette.text.primary,
      opacity: hovered && visible ? 1 : 0,
      pointerEvents: hovered && visible ? "auto" : "none",
      transition: "opacity 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.background.black100,
      },
    });

  return (
    <ListRoot
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IconButton
        aria-label="이전"
        onClick={() => scrollByCard(-1)}
        sx={(theme) => ({
          ...arrowSx(showLeft)(theme),
          left: 8,
        })}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Scroller ref={scrollerRef} onScroll={updateEdges}>
        <Grid container wrap="nowrap" columnSpacing={2}>
          {albums.map((album, index) => (
            <Grid key={album.id} sx={{ flex: "0 0 180px" }}>
              <MusicCard album={album} index={index} />
            </Grid>
          ))}
        </Grid>
      </Scroller>
      <IconButton
        aria-label="다음"
        onClick={() => scrollByCard(1)}
        sx={(theme) => ({
          ...arrowSx(showRight)(theme),
          right: 8,
        })}
      >
        <ChevronRightIcon />
      </IconButton>
    </ListRoot>
  );
}

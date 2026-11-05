import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import PlayButton from "../../../common/components/PlayButton";
import type { SearchExternal } from "../../../types/searchType";

const CARD_STEP = 196;

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

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

const CardRoot = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: 12,
  borderRadius: 12,
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
}));

const CardBody = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 12,
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
  borderRadius: "50%",
});

const Name = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Label = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.3,
}));

type ArtistProps = {
  artists: SearchExternal[];
};

function ArtistCard({ artist }: { artist: SearchExternal }) {
  const imageUrl = artist.images[0]?.url ?? "";

  return (
    <CardRoot className="music-card">
      <CardBody>
        <CoverFrame>
          <Cover src={imageUrl} alt={artist.name} />
          <PlayButton />
        </CoverFrame>
        <div>
          <Name>{artist.name}</Name>
          <Label>Artist</Label>
        </div>
      </CardBody>
    </CardRoot>
  );
}

export default function Artist({ artists }: ArtistProps) {
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
  }, [artists]);

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
      pointerEvents: hovered && visible ? ("auto" as const) : ("none" as const),
      transition: "opacity 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.background.black100,
      },
    });

  if (!artists.length) return null;

  return (
    <Section>
      <Typography variant="h3">아티스트</Typography>
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
            {artists.map((artist) => (
              <Grid key={artist.id} sx={{ flex: "0 0 180px" }}>
                <ArtistCard artist={artist} />
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
    </Section>
  );
}

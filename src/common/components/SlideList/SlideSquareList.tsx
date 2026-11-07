import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import PlayButton from "../PlayButton";

const CARD_STEP = 196;

type CardColor = "primary" | "info" | "warning" | "success" | "error";
const CARD_COLORS: CardColor[] = [
  "primary",
  "info",
  "warning",
  "success",
  "error",
];

export type SlideSquareItem = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
};

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

const CardRoot = styled("div")({
  position: "relative",
  width: "100%",
  padding: "12px",
});

const CardBackground = styled("div", {
  shouldForwardProp: (prop) => prop !== "colorIndex",
})<{ colorIndex: number }>(({ theme, colorIndex }) => {
  const colorKey = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return {
    position: "absolute",
    inset: 0,
    borderRadius: 12,
    backgroundColor: alpha(theme.palette[colorKey].main, 0.9),
    opacity: 0,
    transform: "scale(0.94)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: "none",
    ".music-card:hover &": {
      opacity: 1,
      transform: "scale(1)",
    },
  };
});

const CardBody = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 8,
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
  borderRadius: 8,
});

const Title = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Subtitle = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

function SquareCard({
  item,
  index,
}: {
  item: SlideSquareItem;
  index: number;
}) {
  return (
    <CardRoot className="music-card">
      <CardBackground colorIndex={index} />
      <CardBody>
        <CoverFrame>
          <Cover src={item.imageUrl} alt={item.title} />
          <PlayButton />
        </CoverFrame>
        <Title>{item.title}</Title>
        <Subtitle>{item.subtitle}</Subtitle>
      </CardBody>
    </CardRoot>
  );
}

type SlideSquareListProps = {
  items: SlideSquareItem[];
};

export default function SlideSquareList({ items }: SlideSquareListProps) {
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
  }, [items]);

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
          [theme.breakpoints.down("sm")]: { display: "none" },
        })}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Scroller ref={scrollerRef} onScroll={updateEdges}>
        <Grid container wrap="nowrap" columnSpacing={2}>
          {items.map((item, index) => (
            <Grid key={item.id} sx={{ flex: "0 0 180px" }}>
              <SquareCard item={item} index={index} />
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
          [theme.breakpoints.down("sm")]: { display: "none" },
        })}
      >
        <ChevronRightIcon />
      </IconButton>
    </ListRoot>
  );
}

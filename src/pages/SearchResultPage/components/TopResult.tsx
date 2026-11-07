import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PlayButton from "../../../common/components/PlayButton";
import type {
  SearchAlbum,
  SearchExternal,
  SearchTrack,
} from "../../../types/searchType";
import { TopResultView } from "../../../utils/search";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

const Card = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 20,
  borderRadius: 12,
  backgroundColor: theme.palette.background.black300,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.background.black200,
  },
}));

const CoverFrame = styled("div")({
  position: "relative",
  width: 120,
  height: 120,
  flexShrink: 0,
});

const Cover = styled("img", {
  shouldForwardProp: (prop) => prop !== "rounded",
})<{ rounded?: boolean }>(({ rounded }) => ({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: rounded ? "50%" : 8,
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
}));

const Title = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 32,
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Meta = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.4,
  marginTop: 4,
}));

export type TopResultItem =
  | { kind: "track"; data: SearchTrack }
  | { kind: "artist"; data: SearchExternal }
  | { kind: "album"; data: SearchAlbum };

type TopResultProps = {
  item: TopResultItem | null;
};

export default function TopResult({ item }: TopResultProps) {
  const navigate = useNavigate();

  if (!item) return null;

  const { imageUrl, title, meta, rounded } = TopResultView(item);

  const handleClick = () => {
    if (item.kind === "track") {
      navigate(`/track/${item.data.id}`);
    } else if (item.kind === "artist") {
      navigate(`/artist/${item.data.id}`);
    }
  };

  return (
    <Section>
      <Typography variant="h3">Top Result</Typography>
      <Card className="music-card" onClick={handleClick}>
        <CoverFrame>
          <Cover src={imageUrl} alt={title} rounded={rounded} />
          <PlayButton />
        </CoverFrame>
        <div>
          <Title>{title}</Title>
          <Meta>{meta}</Meta>
        </div>
      </Card>
    </Section>
  );
}

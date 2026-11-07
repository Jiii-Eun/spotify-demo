import { styled } from "@mui/material/styles";
import type { SpotifyAudiobook } from "../../../types/audiobookType";

const HeaderRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 24,
  width: "100%",
  minWidth: 0,
  padding: "32px 24px 28px",
  boxSizing: "border-box",
  background: `linear-gradient(
    180deg,
    ${theme.palette.primary.main}55 0%,
    ${theme.palette.background.paper} 100%
  )`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    padding: "20px 12px 20px",
  },
}));

const Cover = styled("img")(({ theme }) => ({
  width: 232,
  height: 232,
  borderRadius: 8,
  objectFit: "cover",
  flexShrink: 0,
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  backgroundColor: theme.palette.background.black200,
  [theme.breakpoints.down("md")]: {
    width: 180,
    height: 180,
  },
  [theme.breakpoints.down("sm")]: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
}));

const Info = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 12,
  minWidth: 0,
  flex: 1,
});

const TypeLabel = styled("div")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const Title = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: 48,
  fontWeight: 900,
  lineHeight: 1.15,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: 32,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

const Authors = styled("div")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

type AudiobookDetailHeaderProps = {
  audiobook: SpotifyAudiobook;
};

export default function AudiobookDetailHeader({
  audiobook,
}: AudiobookDetailHeaderProps) {
  const coverUrl = audiobook.images?.[0]?.url ?? "";
  const authors =
    audiobook.authors?.map((author) => author.name).join(", ") ?? "";

  return (
    <HeaderRoot>
      <Cover src={coverUrl} alt={audiobook.name} />
      <Info>
        <TypeLabel>오디오북</TypeLabel>
        <Title>{audiobook.name}</Title>
        {authors ? <Authors>{authors}</Authors> : null}
      </Info>
    </HeaderRoot>
  );
}

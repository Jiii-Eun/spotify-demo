import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import type { SpotifyArtist } from "../../../types/trackType";

const HeaderRoot = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: 340,
  display: "flex",
  alignItems: "flex-end",
  padding: "32px 28px 28px",
  boxSizing: "border-box",
  overflow: "hidden",
  backgroundColor: theme.palette.background.black300,
  [theme.breakpoints.down("sm")]: {
    minHeight: 240,
    padding: "20px 16px 20px",
  },
}));

const Background = styled("div")({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center top",
});

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(
    180deg,
    transparent 20%,
    ${theme.palette.background.default}ee 100%
  )`,
}));

const Info = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minWidth: 0,
  maxWidth: "100%",
});

const Name = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: 72,
  fontWeight: 900,
  lineHeight: 1.05,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: 48,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 32,
  },
}));

const Verified = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: 600,
}));

const VerifiedBadge = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const Followers = styled("div")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  opacity: 0.95,
}));

function formatFollowers(total: number) {
  if (total >= 10000) {
    const man = total / 10000;
    const text =
      man >= 100 ? man.toFixed(0) : man >= 10 ? man.toFixed(1) : man.toFixed(1);
    return `${text.replace(/\.0$/, "")}만명`;
  }
  return `${total.toLocaleString("ko-KR")}명`;
}

type ArtistDetailHeaderProps = {
  artist: SpotifyArtist;
};

export default function ArtistDetailHeader({
  artist,
}: ArtistDetailHeaderProps) {
  const imageUrl = artist.images?.[0]?.url ?? "";
  const followers = artist.followers?.total ?? 0;

  return (
    <HeaderRoot>
      <Background style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }} />
      <Overlay />
      <Info>
        <Name>{artist.name}</Name>
        <Verified>
          <VerifiedBadge>
            <CheckIcon sx={{ fontSize: 12 }} />
          </VerifiedBadge>
          Spotify 인증
        </Verified>
        <Followers>팔로워 {formatFollowers(followers)}</Followers>
      </Info>
    </HeaderRoot>
  );
}

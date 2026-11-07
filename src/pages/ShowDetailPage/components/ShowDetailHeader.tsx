import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import type { SpotifyShow } from "../../../types/showType";

const HeaderRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 24,
  width: "100%",
  minWidth: 0,
  padding: "24px 24px 28px",
  boxSizing: "border-box",
  background: `linear-gradient(
    90deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.background.paper} 100%
  )`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    padding: "16px 12px 20px",
  },
}));

const Cover = styled("img")(({ theme }) => ({
  width: 192,
  height: 192,
  borderRadius: 8,
  objectFit: "cover",
  flexShrink: 0,
  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
  backgroundColor: theme.palette.background.black200,
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
}));

const Info = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minWidth: 0,
  flex: 1,
  paddingBottom: 4,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

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
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  [theme.breakpoints.down("md")]: {
    fontSize: 32,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

const PublisherButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme.palette.text.primary,
  fontSize: 16,
  fontWeight: 700,
  "&:hover": {
    textDecoration: "underline",
  },
}));

type ShowDetailHeaderProps = {
  show: SpotifyShow;
};

export default function ShowDetailHeader({ show }: ShowDetailHeaderProps) {
  const navigate = useNavigate();
  const coverUrl = show.images?.[0]?.url ?? "";
  const searchQuery = show.publisher || show.name;

  return (
    <HeaderRoot>
      <Cover src={coverUrl} alt={show.name} />
      <Info>
        <TypeLabel>팟캐스트</TypeLabel>
        <Title>{show.name}</Title>
        {searchQuery ? (
          <PublisherButton
            type="button"
            onClick={() =>
              navigate(`/search/${encodeURIComponent(searchQuery)}`)
            }
          >
            {show.publisher || show.name}
          </PublisherButton>
        ) : null}
      </Info>
    </HeaderRoot>
  );
}

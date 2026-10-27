import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const EmptyPlayListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  margin: "8px",
  padding: "16px 20px",
  borderRadius: 8,
  backgroundColor: theme.palette.background.black400,
}));

const EmptyPlayListTitle = styled("div")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const EmptyPlayListDescription = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  marginBottom: 8,
}));

const EmptyPlayListLink = styled(NavLink)(({ theme }) => ({
  alignSelf: "flex-start",
  padding: "8px 16px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
  color: theme.palette.background.default,
  backgroundColor: theme.palette.secondary.main,
  transition: "transform 0.2s ease",
  "&:hover": {
    textDecoration: "none",
    transform: "scale(1.025)",
  },
}));

export default function EmptyPlayList() {
  return (
    <EmptyPlayListContainer>
      <EmptyPlayListTitle>첫 번째 플레이리스트를 만드세요.</EmptyPlayListTitle>
      <EmptyPlayListDescription>
        어렵지 않아요. 저희가 도와드릴게요.
      </EmptyPlayListDescription>
      <EmptyPlayListLink to="/login">플레이리스트 만들기</EmptyPlayListLink>
    </EmptyPlayListContainer>
  );
}

import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginButton from "../../layout/Layout/components/Header/LoginButton";

const PageRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  textAlign: "center",
  background: `linear-gradient(
    180deg,
    ${theme.palette.background.black300} 0%,
    ${theme.palette.background.paper} 100%
  )`,
}));

const Message = styled("p")(({ theme }) => ({
  margin: 0,
  maxWidth: 360,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.5,
  color: theme.palette.text.primary,
}));

const ButtonRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
  // LoginButton(아바타 32 + padding 8*2)와 높이 통일
  "& > *": {
    height: 48,
    boxSizing: "border-box",
  },
  "& > * > button": {
    height: "100%",
  },
});

const HomeButton = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 48,
  minWidth: 40,
  padding: "0 16px",
  borderRadius: 999,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: "none",
  color: theme.palette.background.default,
  backgroundColor: theme.palette.secondary.main,
  transformOrigin: "center center",
  transition: "transform 0.1s ease, color 0.1s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    transform: "scale(1.025)",
  },
}));

export default function NotFoundPage() {
  return (
    <PageRoot>
      <Message>접근할 수 없거나 존재하지 않는 페이지입니다.</Message>
      <Message>로그인하거나 홈페이지로 이동해주세요.</Message>

      <ButtonRow>
        <LoginButton />
        <HomeButton to="/">홈페이지로 이동</HomeButton>
      </ButtonRow>
    </PageRoot>
  );
}

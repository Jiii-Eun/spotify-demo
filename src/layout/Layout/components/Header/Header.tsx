import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import SearchField from "../../../../common/components/Search/SearchField";

const HeaderContainer = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    gap: 4,
  },
}));

const HeaderLeft = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 48,
  marginLeft: 16,
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 8,
    gap: 8,
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: 42,
  height: 42,
  objectFit: "contain",
  borderRadius: "50%",
  backgroundColor: theme.palette.secondary.main,
  flexShrink: 0,
}));

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <h1 style={{ margin: 0 }}>
          <NavLink to="/">
            <Logo src="/logo.png" alt="logo" />
          </NavLink>
        </h1>
        <SearchField variant="header" />
      </HeaderLeft>
      <LoginButton />
    </HeaderContainer>
  );
}

import { InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";

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
}));

const SearchBar = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px",
  backgroundColor: theme.palette.background.black400,
  border: `1px solid transparent`,
  borderRadius: "999px",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
    border: `1px solid ${theme.palette.background.black200}`,
  },
  "&:focus-within": {
    backgroundColor: theme.palette.background.black300,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));

const SearchLink = styled(NavLink)(({ theme }) => ({
  fontSize: 16,
  width: 38,
  color: "#b3b3b3",
  "&:hover": { color: theme.palette.primary.main },
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
        <SearchBar>
          <SearchIcon
            sx={(theme) => ({
              color: "#b3b3b3",
              "&:hover": { scale: 1.1, color: theme.palette.primary.main },
            })}
          />
          <InputBase
            placeholder="원하는 음악을 검색하세요"
            style={{ textOverflow: "ellipsis", flex: 1 }}
          />
          <div
            style={{
              color: "#b3b3b3",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
            }}
          >
            |
          </div>
          <SearchLink to="/search">검색</SearchLink>
        </SearchBar>
      </HeaderLeft>
      <LoginButton />
    </HeaderContainer>
  );
}

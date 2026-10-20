import { InputBase, Link, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HeaderContainer = styled("div")({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const HeaderLeft = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 48,
  marginLeft: 16,
});

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

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <h1 style={{ margin: 0 }}>
          <Link href="/">
            <Logo src="/logo.png" alt="logo" />
          </Link>
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
          <div style={{ color: "#b3b3b3" }}>|</div>
          <Link
            href="/search"
            sx={(theme) => ({
              fontSize: 16,
              width: 38,
              textDecoration: "none",
              color: "#b3b3b3",
              "&:hover": { color: theme.palette.primary.main },
            })}
          >
            검색
          </Link>
        </SearchBar>
      </HeaderLeft>
    </HeaderContainer>
  );
}

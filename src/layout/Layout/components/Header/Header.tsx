import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchField from "../../../../common/components/Search/SearchField";
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
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 4,
    gap: 8,
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: theme.palette.text.primary,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    display: "inline-flex",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: 42,
  height: 42,
  objectFit: "contain",
  borderRadius: "50%",
  backgroundColor: theme.palette.secondary.main,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: 36,
    height: 36,
  },
}));

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <MenuButton
          aria-label="라이브러리 열기"
          onClick={onOpenSidebar}
          size="small"
        >
          <MenuIcon />
        </MenuButton>
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

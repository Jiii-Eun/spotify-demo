import { useEffect, useRef, useState } from "react";
import { Button, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

import { login, logout } from "../../../../utils/userAuth";
import { useGetCurrentUserProfile } from "../../../../hooks/useUser";

const Root = styled("div")({
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
});

const LoginButtonContainer = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.background.default,
  overflow: "hidden",
  minWidth: 40,
  minHeight: 40,
  maxWidth: 140,
  padding: "8px 4px",
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1,
  transformOrigin: "center center",
  transition: "max-width 0.25s ease, transform 0.1s ease, color 0.1s ease",

  "&:hover": {
    color: theme.palette.primary.main,
    transform: "scale(1.025)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 40,
    maxHeight: 40,
    padding: 8,
  },
}));

const Label = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  opacity: 1,
  whiteSpace: "nowrap",
  padding: "0 6px",
  overflow: "hidden",
  lineHeight: 1,
  transition: "opacity 0.2s ease",
  [theme.breakpoints.down("sm")]: {
    opacity: 0,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const Nickname = styled("span")({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  lineHeight: 1,
  display: "block",
  borderRadius: 0,
});

const IconWrap = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  opacity: 0,
  right: "50%",
  top: "50%",
  transform: "translate(50%, -50%)",
  transition: "opacity 0.2s ease",
  pointerEvents: "none",
  [theme.breakpoints.down("sm")]: {
    opacity: 1,
  },
}));

const Dropdown = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  zIndex: 20,
  minWidth: 140,
  padding: 4,
  borderRadius: 8,
  backgroundColor: theme.palette.background.black400,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
}));

const DropdownItem = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  margin: 0,
  padding: "10px 12px",
  border: "none",
  borderRadius: 6,
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  textAlign: "left",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
}));

export default function LoginButton() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { data: userProfile } = useGetCurrentUserProfile();
  const isLoggedIn = !!userProfile;
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = userProfile?.images?.[0]?.url;
  const displayName = userProfile?.display_name;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsOpen((prev) => !prev);
      return;
    }
    login();
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <Root ref={rootRef}>
      <LoginButtonContainer
        aria-label={isLoggedIn ? "계정 메뉴" : "로그인"}
        aria-haspopup={isLoggedIn ? "menu" : undefined}
        aria-expanded={isLoggedIn ? isOpen : undefined}
        onClick={handleButtonClick}
      >
        <Label>
          {isLoggedIn ? (
            <>
              <UserAvatar src={imageUrl} alt={displayName ?? "user profile"} />
              <Nickname>{displayName}</Nickname>
            </>
          ) : (
            <>
              <LoginIcon fontSize="small" />
              로그인
            </>
          )}
        </Label>
        <IconWrap>
          {isLoggedIn ? (
            <UserAvatar src={imageUrl} alt={displayName ?? "user profile"} />
          ) : (
            <LoginIcon />
          )}
        </IconWrap>
      </LoginButtonContainer>

      {isLoggedIn && isOpen && (
        <Dropdown role="menu">
          <DropdownItem type="button" role="menuitem" onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
            로그아웃
          </DropdownItem>
        </Dropdown>
      )}
    </Root>
  );
}

import { Button, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";

import { getSpotifyAuthUrl } from "../../../../utils/auth";
import { useGetCurrentUserProfile } from "../../../../hooks/useUser";

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
  width: 24,
  height: 24,
  opacity: 0,
  right: "50%",
  top: "50%",
  transform: "translate(49%, -51%)",
  transition: "opacity 0.2s ease",
  [theme.breakpoints.down("sm")]: {
    opacity: 1,
  },
}));

export default function LoginButton() {
  const { data: userProfile } = useGetCurrentUserProfile();

  const login = () => {
    getSpotifyAuthUrl();
  };

  const imageUrl = userProfile?.images?.[0]?.url;
  const displayName = userProfile?.display_name;

  return (
    <LoginButtonContainer aria-label="로그인" onClick={login}>
      <Label>
        {userProfile ? (
          <>
            <UserAvatar src={imageUrl} alt={displayName ?? "user profile"} />
            <Nickname>{displayName}</Nickname>
          </>
        ) : (
          "로그인"
        )}
      </Label>
      <IconWrap>
        <LoginIcon />
      </IconWrap>
    </LoginButtonContainer>
  );
}

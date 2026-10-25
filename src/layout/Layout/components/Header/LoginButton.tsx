import { Button, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";

import { getSpotifyAuthUrl } from "../../../../utils/auth";
import { useGetCurrentUserProfile } from "../../../../hooks/useUser";

const LoginButtonContainer = styled(Button)(({ theme }) => ({
  position: "relative",
  borderRadius: 999,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.background.default,
  overflow: "hidden",
  minWidth: 40,
  minHeight: 40,
  maxWidth: 140,
  fontSize: 18,
  fontWeight: 600,
  transition: "max-width 0.25s ease",

  "&:hover": {
    color: theme.palette.primary.main,
    scale: 1.025,
    transition: "scale 0.1s ease",
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
  opacity: 1,
  whiteSpace: "nowrap",
  padding: "0 16px",
  transform: "translateY(1.4px)",
  transition: "opacity 0.2s ease",
  [theme.breakpoints.down("sm")]: {
    opacity: 0,
  },
}));

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

  return (
    <LoginButtonContainer aria-label="로그인" onClick={login}>
      <Label>
        {userProfile ? (
          <>
            <Avatar src={imageUrl} alt="user profile" />{" "}
            {userProfile?.display_name}
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

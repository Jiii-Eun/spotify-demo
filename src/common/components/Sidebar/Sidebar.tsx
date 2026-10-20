import AddIcon from "@mui/icons-material/Add";
import { Link, styled } from "@mui/material";

const SidebarHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
});

const SidebarTitle = styled("div")({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "35px",
});

const SidebarContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  margin: "8px",
  padding: "16px 20px",
  borderRadius: 8,
  backgroundColor: theme.palette.background.black400,
}));

const SidebarContentTitle = styled("div")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const SidebarContentDescription = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  marginBottom: 8,
}));

const CreatePlaylistLink = styled(Link)(({ theme }) => ({
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

export default function Sidebar() {
  return (
    <div>
      <SidebarHeader>
        <SidebarTitle>내 라이브러리</SidebarTitle>
        <AddIcon
          sx={(theme) => ({
            width: 35,
            height: 35,
            color: theme.palette.primary.main,
            cursor: "pointer",
            padding: "4px",
            borderRadius: "50%",
            backgroundColor: "#1f1f1f",
            "&:hover": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              transition: "all 0.3s ease",
            },
          })}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentTitle>
          첫 번째 플레이리스트를 만드세요.
        </SidebarContentTitle>
        <SidebarContentDescription>
          어렵지 않아요. 저희가 도와드릴게요.
        </SidebarContentDescription>
        <CreatePlaylistLink href="/login">
          플레이리스트 만들기
        </CreatePlaylistLink>
      </SidebarContent>
    </div>
  );
}

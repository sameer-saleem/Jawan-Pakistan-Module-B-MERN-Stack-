import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Face3Icon from "@mui/icons-material/Face3";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import TvIcon from "@mui/icons-material/Tv";
import WeekendIcon from "@mui/icons-material/Weekend";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import BedIcon from "@mui/icons-material/Bed";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const SidebarContainer = styled(Box)({
  width: 70,
  height: "100vh",
  backgroundColor: "#f8fafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 8,
  borderRight: "1px solid #e0e0e0",
});

const IconWrapper = styled(Box)(({ active }) => ({
  width: "100%",
  height: 56,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: active ? "#e3f2fd" : "transparent",
  borderRadius: 6,
  cursor: "pointer",
  marginBottom: 4,
  "&:hover": {
    backgroundColor: active ? "#e3f2fd" : "#f1f1f1",
  },
  transition: "background-color 0.3s ease",
}));

const Sidebar = () => {

  const icons = [
    <MenuIcon />,
    <PersonOutlineIcon />,
    <Face3Icon />,
    <ChildCareIcon />,
    <TvIcon />,
    <WeekendIcon />,
    <SportsEsportsIcon />,
    <BedIcon />,
    <CardGiftcardIcon />,
  ];

  return (
    <SidebarContainer>
      {icons.map((icon, index) => (
        <IconWrapper
          key={index}
        >
          <IconButton>
            {icon}
          </IconButton>
        </IconWrapper>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../../assets/lp-logo.webp";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: 500,
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  height: 40,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#888",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  "& input": {
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid #e0e0e0",
        padding: "4px 24px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={logo} alt="Pixorus Logo" />
        </Box>

        <Search>
          <StyledInputBase placeholder="Search product" />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleMenu}
          >
            <Avatar
              src="/profile.jpg"
              alt="User"
              sx={{ width: 32, height: 32, marginRight: 1 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Diego Morata
            </Typography>
            <ArrowDropDownIcon fontSize="small" />
          </Box>

          <Typography
            variant="body2"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Chart
          </Typography>

          <Typography
            variant="body2"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Orders
          </Typography>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
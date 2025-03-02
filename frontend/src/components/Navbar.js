import { AppBar, Toolbar, Box, Button, IconButton, Menu, MenuItem, useMediaQuery, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Hotels", path: "/hotels" },
    { label: "Recommendations", path: "/recommend" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976d2",
        color: "#333",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        py: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand Name */}
        <Typography variant="h6" color="#fff" sx={{ flexGrow: 1, fontFamily: "Lucida Console", gap: 2, fontWeight: 'bold' }}>
          STAYEASE
        </Typography>


        {/* Mobile Menu */}
        {isMobile ? (
          <Box>
            <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon sx={{ color: "white", fontSize: "40px" }} />
          </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(null)}
              sx={{ "& .MuiMenu-paper": { backgroundColor: "#ffff" } }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleMenuClose(item.path)}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.2rem",
                    color: location.pathname === item.path ? "#1976d2" : "#333",
                    fontWeight: location.pathname === item.path ? "bold" : "normal",
                    "&:hover": { backgroundColor: "#fff", color: "#1976d2" },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          /* Desktop Navigation */
          <Box sx={{ display: "flex", gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                    color: location.pathname === item.path ? "#fff" : "#333",
                    fontSize: "1rem",
                    fontWeight: "500",
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "none",
                    letterSpacing: "0.5px",
                    transition: "color 0.3s ease",
                    position: "relative",
                    "&:hover": { color: "#fff" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: "-3px",
                      width: location.pathname === item.path ? "100%" : "0",
                      borderBottom: location.pathname === item.path ? "2px solid #fff" : null,
                      height: "2px",
                      backgroundColor: "#1976D2",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
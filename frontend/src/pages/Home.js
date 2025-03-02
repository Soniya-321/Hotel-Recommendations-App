import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative", // To position the overlay
        backgroundImage:
          "url('https://cdn.prod.website-files.com/65645f17b0669b030c7df2ca/65658722a850dda1e2605947_Welcome%20Hotel%20home.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Transparent Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black overlay with 60% opacity
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: "relative", // Keeps text above the overlay
          zIndex: 1, // Ensures text is above overlay
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{fontFamily: "Oswald", fontWeight: "bold", mb: 2 }}>
          Find Your Perfect Stay
        </Typography>
        <Typography variant="h6" sx={{fontFamily: "Raleway", mb: 4 }}>
          Discover top-rated hotels with the best amenities and stunning views.  
          Book now for an unforgettable experience!
        </Typography>

        <Box sx={{fontFamily: "sans-serif", display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/hotels")}>
            Explore Hotels
          </Button>
          <Button variant="outlined" color="light" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

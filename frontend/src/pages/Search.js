import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
  Container,
  TextField,InputAdornment,
  IconButton
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HotelIcon from "@mui/icons-material/Hotel";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/hotels`);
      const data = await response.json();
      setHotels(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Filter hotels based on search query
  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          backgroundImage:
            "url('https://hips.hearstapps.com/hmg-prod/images/grand-hotel-tremezzo-6479210d9dae0.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
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
            opacity: 0.9,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />

        {/* Content */}
        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Lucida Calligraphy",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Discover Your Dream Stay
          </Typography>

          {/* Search Bar */}
          {/* Search Bar */}
          <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                outline: "none",
              }}
            />
          </Box>
        </Container>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredHotels.map((hotel, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card sx={{ maxWidth: 300, width: "100%", boxShadow: 3, borderRadius: 2,cursor: 'pointer' }} onClick={() => navigate(`/hotel/${hotel.hotel_id}`)}>
                <CardMedia
                  component="img"
                  height="180"
                  image={hotel.image_url || "https://via.placeholder.com/300"}
                  alt={hotel.hotel_name}
                />
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <HotelIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    {hotel.hotel_name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontSize={"20px"}>
                    <LocationOnIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
                    {hotel.location}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    <CurrencyRupeeIcon sx={{ verticalAlign: "middle", mr: 0.1 }} />
                    {hotel.price}
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "left", gap: 1 }}>
                    <Rating value={hotel.rating} precision={0.1} readOnly />
                    <Typography variant="body1" color="text.secondary">
                      {hotel.rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Search;

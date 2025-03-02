import React, { useState } from "react";
import {Box, Rating, Container, TextField, Button, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HotelIcon from "@mui/icons-material/Hotel";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState("");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    const preferences = {
      location,
      price,
      amenities: amenities ? amenities.split(",").map((a) => a.trim()) : []
    };
    console.log(JSON.stringify(preferences));
    
    const url = `http://127.0.0.1:5000/recommend?preferences=${JSON.stringify(preferences)}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h6" fontFamily={"caveat"} gutterBottom textAlign={"left"} marginBottom={"20px"} >
        Search for hotels by Location, Price, and Amenities
      </Typography>

      {/* Single Grid for both Column & Row Layout */}
      <Grid
        container
        spacing={0.5}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Column below 768px, Row above 768px
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Grid item sx={{ width: { xs: "100%", md: "30%" }, padding: "10px" }}>
          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", md: "30%" }, padding: "10px" }}>
          <TextField
            label="Price"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ width: { xs: "100%", md: "30%" }, padding: "10px" }}>
          <TextField
            label="Amenities (comma-separated)"
            fullWidth
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={fetchHotels}
        style={{ margin: "10px 0", padding: "10px 20px" }}
      >
        Search
      </Button>

      {/* Hotel Results */}
      {hotels.length > 0 && (
        <Grid container spacing={1} style={{width: "100%", marginTop: "15px" }}>
          {hotels.map((hotel, index) => (
            <Grid item key={index} style={{ margin: "auto",marginBottom: '20px' }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Card sx={{width: 250, height: 370, boxShadow: 3, borderRadius: 2, cursor: 'pointer' }} onClick={() => navigate(`/hotel/${hotel.hotel_id}`)}>
                <CardMedia component="img" height="160" image={hotel.image_url} alt={hotel.hotel_name} />
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
      )}
    </Container>
  );
}

export default Hotels;

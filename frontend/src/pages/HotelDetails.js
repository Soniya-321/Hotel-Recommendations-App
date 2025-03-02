import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  Rating,
  Grid,
  Chip, Button
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function HotelDetails() {
  const { hotel_id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hotel-recommendations-app.onrender.com/hotels/${hotel_id}`)
      .then((response) => response.json())
      .then((data) => setHotel(data))
      .then((response) => console.log(hotel_id))
      .catch((error) => console.error("Error fetching hotel details:", error));
  }, [hotel_id]);

  if (!hotel) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontFamily: "Oswald", fontWeight: "bold", mb: 3 }}>
        {hotel.hotel_name}
      </Typography>

      <CardMedia component="img" height="400" image={hotel.image_url || "https://via.placeholder.com/600"} alt={hotel.hotel_name} sx={{ borderRadius: 2 }} />

      <Typography variant="h5" sx={{ mt: 3 }}>
        <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1, mb:1 }} />
        {hotel.location}
      </Typography>

      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        <CurrencyRupeeIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
        {hotel.price}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "left", gap: 1 }}>
        <Rating value={hotel.rating} precision={0.1} readOnly />
        <Typography variant="body1" color="text.secondary" fontSize={'20px'}>
        {hotel.rating}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mt: 3 }}>
        {hotel.description}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb:2 }}>Amenities:</Typography>
      <Grid container spacing={1}>
        {hotel.amenities.map((amenity, index) => (
          <Grid item key={index}>
            <Chip label={amenity} fontSize="20px" />
          </Grid>
        ))}
      </Grid>
      {/* Book Hotel Button */}
        <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 3 }} 
        onClick={() => navigate(`/payment?hotel_id=${hotel.hotel_id}`)}
        >
        Book Now
        </Button>
    </Box>
  );
}

export default HotelDetails;

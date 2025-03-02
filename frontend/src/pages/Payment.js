import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Grid, CardMedia } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({ name: "", cardNumber: "", expiry: "", cvv: "" });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const hotelId = searchParams.get("hotel_id");
      if (!hotelId) return;

      try {
        const response = await fetch(`https://hotel-recommendations-app.onrender.com/hotels/${hotelId}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!form.name || !form.cardNumber || !form.expiry || !form.cvv) {
      alert("Please fill in all payment details.");
      return;
    }
    alert("Payment Successful! Redirecting...");
    navigate("/confirmation"); // Redirect to confirmation page
  };

  return (
    <Box sx={{ maxWidth: "xl", mx: "auto", m: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      {hotel ? (
        <Card sx={{boxShadow: 0}}>
          <Grid container spacing={3} flexDirection={isSmallScreen ? "column" : "row"}>
            {/* Hotel Image */}
            <Grid item xs={12} sm={12} md={6} sx={{order: {xs: 0, md: 1}, objectFit: {md: "cover"}}}>
              <CardMedia
                component="img"
                image={"https://img.freepik.com/free-vector/room-reservation-online-customer-support-consultation-virtual-reception-office_335657-2488.jpg?semt=ais_hybrid"}
                alt={hotel.hotel_name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginRight: '25px',
                  borderTopLeftRadius: isSmallScreen ? 0 : "10px",
                  borderBottomLeftRadius: isSmallScreen ? 0 : "10px",
                }}
              />
            </Grid>

            {/* Hotel Details & Payment Form */}
            <Grid item xs={12} sm={12} md={6}>
              <CardContent>
                <Typography variant="h5" color={'primary'} sx={{ mb: 2, fontWeight: "bold" }}>
                  Confirm Your Booking
                </Typography>

                <Typography variant="h6" color="dark">{hotel.hotel_name}</Typography>
                <Typography variant="body1" color="text.secondary">{hotel.location}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>₹{hotel.price}</Typography>

                {/* Payment Form */}
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      type="password"
                    />
                  </Grid>
                </Grid>

                {/* Pay Now Button */}
                <Button
  variant="contained"
  color="primary"
  sx={{
    mt: 3,
    width: { xs: "100%", sm: "100%", md: "auto" }, // Full width for xs & sm, auto for md+
    px: { md: 4 }, // Add some padding on larger screens
  }}
  onClick={handlePayment}
>
  Pay Now
</Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Typography>Loading hotel details...</Typography>
      )}
    </Box>
  );
}

export default Payment;

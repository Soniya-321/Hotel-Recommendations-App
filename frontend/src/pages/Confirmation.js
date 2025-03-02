import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 'xl', width: "100%", boxShadow: 3, borderRadius: 2, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Image Section */}
          <Grid item xs={12} sm={12} md={6}>
            <CardMedia
              component="img"
              image="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148564871.jpg?ga=GA1.1.1170278498.1740842127&semt=ais_hybrid"
              alt="Booking Confirmed"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Confirmation Message */}
          <Grid item xs={12} sm={12} md={6}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
                Booking Confirmed! 🎉
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Thank you for booking with us. Your confirmation details have been sent to your email.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 3 }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Confirmation;

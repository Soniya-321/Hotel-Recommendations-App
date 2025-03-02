import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

function Contact() {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handles input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles phone input change
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  // Handles form submission
  const handleSubmit = () => {
    alert("Message Sent Successfully! ✅");
    // Clear form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Contact Us Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Contact Us
        <Box sx={{ width: 50, height: 4, backgroundColor: "#007bff", mt: 1 }} />
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Grid container spacing={2}>
          {/* Left Section - Contact Form */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName" required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName" required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email" required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PhoneInput
                  country={"ng"}
                  inputStyle={{ width: "100%" }}
                  value={formData.phone} required
                  onChange={handlePhoneChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message or Enquiry"
                  multiline
                  rows={4}
                  variant="outlined" required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "12px",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </Grid>

          {/* Right Section - Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://www.blogtyrant.com/wp-content/uploads/2019/12/best-contact-us-pages-2.png"
              alt="Contact Us"
              width="105%"
              height="95%"
              borderRadius={2}
              margin={0}
              padding={0}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Contact;

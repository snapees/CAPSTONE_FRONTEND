import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../address/Address.css'
const defaultTheme = createTheme();

export default function SignUp() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipcode] = useState('');
  const token = localStorage.getItem('token');
  console.log(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fullName = name;
    let contactVal = contact;
    let cityVal = city;
    let landmarkVal = landmark;
    let streetVal = street;
    let stateVal = state;
    let zipCodeVal = zipCode;

    if (contactVal.length !== 10) {
      alert('Enter a valid 10-digit contact number');
      return;
    }
   

    const url = 'http://localhost:3001/api/v1/addresses';
    try {
      const response = await axios.post(
        url,
        {
          name: fullName,
          contactNumber: contactVal,
          city: cityVal,
          landmark: landmarkVal,
          street: streetVal,
          state: stateVal,
          zipCode: zipCodeVal,
        },
        {
          headers: {
            'x-auth-token': `${token}`,
            "content-type":"application/json",
          },
        }
      );
      if (response.data) {
        window.alert('Success');
      }
    } catch (error) {
      console.error(error);
      window.alert('Error');
    }

    // Reset the form values
    setName('');
    setContact('');
    setCity('');
    setLandmark('');
    setStreet('');
    setState('');
    setZipcode('');
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Address
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="Contact"
                  type="number"
                  id="contact"
                  autoComplete="number"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  onKeyDown={handleKeyDown}
                  value={city}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="landmark"
                  label="Landmark"
                  name="landmark"
                  onKeyDown={handleKeyDown}
                  value={landmark}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onChange={(e) => {
                    setLandmark(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  onKeyDown={handleKeyDown}
                  value={street}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  onKeyDown={handleKeyDown}
                  value={state}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                  onKeyDown={handleKeyDown}
                  value={zipCode}
                  inputProps={{
                    maxLength: 255,
                    minLength: 5,
                  }}
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const[fsName,setFsName]=useState('');
  const[lsName,setLsName]=useState('');
  const[email,setEmail]=useState('');
  const[contact,setContact]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let firstNameVal=data.get('firstName');
    let lastNameVal=data.get('lastName');
    let passwordVal=data.get('password');
    let emailVal=data.get('email');
    let contactVal=data.get('contact');
    if(contactVal.length>10 || contactVal.length<10){
      alert("Enter A Valid Number")
      data.set("contact","")
      setContact("");
      return;
    }
      const url ="http://localhost:3001/api/v1/users";
      const res= await axios.post(url,JSON.stringify({
        firstName: firstNameVal,
        lastName: lastNameVal,
        password: passwordVal,
        email: emailVal,
        contactNumber: contactVal,
      }),{headers:{
        "content-type":"application/json",
      }}).then((response)=>{if(response.data){
        navigate('/')
      }}).catch(
        (err)=>{
          console.log("err")
        }
      )

      // fetch(url,{
      //   method:'POST',
      //   headers:{
      //     "content-type":"application/json",
      //   },
      //   body: JSON.stringify({
      //     firstName: firstNameVal,
      //     lastName: lastNameVal,
      //     password: passwordVal,
      //     email: emailVal,
      //     contactNumber: contactVal
      //   })
      // }).then((response)=>response.json()).then((data)=>{
      //   if(data){
      //     navigate('/')
      //   }}).catch(
      //     (err)=>{
      //       console.log("err-> "+err)
      //     }
      //   )
        data.set("firstName","")
        data.set("lastName","")
        data.set("email","")
        data.set("password","")
        data.set("contact","")
        setFsName("");
        setLsName("");
        setPassword("");
        setContact("");
        setEmail("");
    // console.log({
    //   firstName: firstNameVal,
    //   lastName: lastNameVal,
    //   password: passwordVal,
    //   email: emailVal,
    //   contactNumber: contactVal,
    // });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fsName}
                  inputProps={{ maxLength:50,
                    minLength:5,}}  
                  onChange={(e)=>{setFsName(e.target.value)}}
                  autoFocus

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lsName}
                  inputProps={{ maxLength:50,
                                minLength:5,}}  
                  onChange={(e)=>{setLsName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  inputProps={{ maxLength:255,
                    minLength:5,}}  
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  inputProps={{ maxLength:1024,
                    minLength:5,}}  
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="contact"
                  type="number"
                  id="contact"
                  autoComplete="number"
                  value={contact}
                  onChange={(e)=>{
                    setContact(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
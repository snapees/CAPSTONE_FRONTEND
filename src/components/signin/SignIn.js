import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

export default function SignIn() {
  React.useEffect(()=>{
    localStorage.clear()
  },[])
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let emailVal = data.get("email") 
    let passwordVal = data.get("password") 
    const url = 'http://localhost:3001/api/v1/auth';

   try{
    const response= await axios.post(url,{
      email: emailVal,
      password: passwordVal,
    
    },{headers:{
      "content-type":"application/json",
    }})
    console.log(response.data)
    if(response.data.isAuthenticated){
      localStorage.setItem('role',response.data.role)
      localStorage.setItem('token',response.data.userToken)
      localStorage.setItem('userId',response.data._id)
    navigate('/products')
    }
   }
   catch(err){
        alert('wrong details')
        setEmail('')
        setPassword('')
        data.set('email','')
        data.set('password','')
        
      }
   }
    // fetch(url,{
    //   method:'POST',
    //   headers:{
    //     "content-type":"application/json",
    //   },
    //   body: JSON.stringify({
    //     email: emailVal,
    //     password: passwordVal,
    //   })
    // }).then((response)=>response.json()).then((data)=>{
    //   if(data.isAuthenticated){
    //     navigate('/products')
    //   }}).catch(
    //     (err)=>{
    //       console.log("err-> "+err)
    //     }
    //   )
    

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              autoFocus
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent={'center'}>
              <Grid item >
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
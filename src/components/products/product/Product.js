import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardContent, CardMedia } from '@mui/material';
import Header from '../../../common/header/Header';


function Product() {
  const { id }  = useParams();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [itemAvailablity, setItemAvailablity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const role = localStorage.getItem('role');
  const url = `http://localhost:3001/api/v1/products/${id}`;

  async function fetchProduct() {
    try {
      const response = await axios.get(url);
      const { data } = response;
      setName(data.name || '');
      setDesc(data.description || '');
      setPrice(data.price || '');
      setItemAvailablity(data.availableItems || '');
      setCategory(data.category || '');
      setImage(data.imageURL || '');
    } catch (err) {
      console.log('Error in fetch product > ', err);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        price,
        description: desc,
        imgUrl: image,
        category,
        availableItems: itemAvailablity,
      };
  
      const response = await axios.put(
        `http://localhost:3001/api/v1/products/${id}`,
        productData
      );
      
      const { data } = response;
      console.log(data);
      
      if (data.success) {
        window.alert("Something went wrong");
      } else {
        window.alert("Success");
        navigate("/Products");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  if (role === 'admin') {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddShoppingCartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Product
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <TextField
                    autoComplete="productName"
                    name="productName"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      console.log(e.target.value)
                    }}
                    id="productName"
                    label="Product Name"
                    focused
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    name="categories"
                    id="demo-simple-select"
                    label="Categories"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    
                    }}
                  >
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    <MenuItem value={"Men's wear"}>Men's wear</MenuItem>
                    <MenuItem value={"Shoes"}>Shoes</MenuItem>
                    <MenuItem value={"Clothes"}>Clothes</MenuItem>
                    <MenuItem value={"Furniture"}>Furniture</MenuItem>
                    <MenuItem value={"Food and beverage"}>
                      Food and beverage
                    </MenuItem>
                    <MenuItem value={"Book"}>Book</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  focused
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="itemAvailablity"
                  label="Item Availablity"
                  type="number"
                  id="itemAvailablity"
                  autoComplete="itemAvailablity"
                  value={itemAvailablity}
                  onChange={(e) => {
                    setItemAvailablity(e.target.value);
                  }}
                  focused
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="imageURL"
                  label="Image URL"
                  type="url"
                  id="imageURL"
                  autoComplete="imageURL"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  focused
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="manufacturer"
                  label="Manufacturer"
                  type="name"
                  id="manufacturer"
                  autoComplete="manufacturer"
                  value={'Can\'t Change'}
                  focused
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <textarea
                  id="productDesc"
                  name="productDesc"
                  rows={6}
                  cols={52}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpdate}
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else if (role === 'user') {
    return (
      <>
        <Header />
            <div className="container">
              <div className="check">
                <img className="image" src={image} alt="images" />
              </div>
              <div className="section">
                <div>
                  name : <span className="changes">{name}</span>
                </div>
                <div>
                  Description :
                  <span className="changes"> {desc}</span>{" "}
                </div>

                <div>
                  price :<span className="changes">{price}rs</span>{" "}
                </div>
                <div>
                  category :<span className="changes">{category}</span>{" "}
                </div>
                <br></br>
                <button onClick={()=>{navigate(`/order/${id}`)}} className='placeBtn'>Place Order</button>
              </div>
            </div>
            <p>Loading...</p>
      </>
    );
  }
}

export default Product;

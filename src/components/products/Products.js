import React, { useState } from "react";
import Header from "../../common/header/Header";
import axios from "axios";
import { useEffect } from "react";
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
import './Product.css'
import ProductCard from "../productcard/ProductCard";
import ImageList from '@mui/material/ImageList';
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  left: "35%",
  width: '30%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  height:'95%',
  marginTop:'1%',
};
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
function Products() {
  
  const navigate = useNavigate()
  let token = localStorage.getItem('token')
  const [age, setAge] = React.useState('');
  const [products,showProducts]=useState([])
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [openProduct, setOpenProduct] = React.useState(false);
  const [openAddress, setOpenAddress] = React.useState(false);
  const handleOpenProductModal = () => setOpenProduct(true);
  const handleCloseProductModal = () => setOpenProduct(false);
  const handleOpenAddressModal = () => setOpenAddress(true);
  const handleCloseAddressModal = () => setOpenAddress(false);
  const url = "http://localhost:3001/api/v1/products";
  async function fetchProducts() {
    let res = await axios.get(url);
    let obj = res.data;
    let filter=localStorage.getItem('filter')
    if(filter=='low-to-high'){
      obj=obj.sort((one,two)=>one.price-two.price)
    }else if(filter=='high-to-low'){
      obj=obj.sort((one,two)=>two.price-one.price)
    }else if(filter=='newest'){
      obj=obj.sort((one,two)=>new Date(two.date) - new Date(one.date))
    }else{
      obj=obj.reverse()
    }
    let arrProducts=obj.map((item,index)=>{
        return <ProductCard dltClick={deleteProduct} navToProduct={navigateProduct} name={item.name} id = {item._id} key={index} desc={item.description} imgUrl={item.imageURL} price={item.price}/>
    })
    showProducts([...arrProducts])
  }
  async function deleteProduct(key){
    let dltURL = `http://localhost:3001/api/v1/products/${key}`
    let res = await axios.delete(dltURL,{
      headers: {
        'x-auth-token': `${token}`,
      }
    })
    console.log(res.data)
    window.location.reload()
  }
  function navigateProduct(id){
    navigate(`/Products/${id}`)
  }
  useEffect(() => {
    fetchProducts();
  }, [<Header/>]);
  const handleProduct= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('in handle submit')
    let currName=data.get('productName')
    let currCategories=data.get('categories')
    let currPrice = data.get('price')
    let currDescription = data.get('productDesc')
    let currManufacturer = data.get('manufacturer')
    let currItemAvailablity = data.get('itemAvailablity')
    let currImageURL = data.get('imageURL')
    let obj={name:currName,
      category:currCategories,
      price:currPrice,
      description:currDescription,
      manufacture:currManufacturer,
      availableItems:currItemAvailablity,
      imageURL:currImageURL,}
      console.log(obj)
   try{
    let res= await axios.post(url,JSON.stringify(obj),{headers:{
      "content-type":"application/json",
      'x-auth-token': `${token}`,
    }})
   }catch(err){
    console.log('err > '+err)
   }
   handleCloseProductModal()
   window.location.reload()
  }
  const handleAddress= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currname=data.get('name')
    let currcontactnumber=data.get('contactnumber')
    let currcity = data.get('city')
    let currlandmark = data.get('landmark')
    let currstreet = data.get('street')
    let currstate = data.get('state')
    let currzipcode = data.get('zipcode')
    if(currcontactnumber<1000000000 ||currcontactnumber> 99999999999){
      alert("Not Valid Number")
    }else if(currzipcode< 100000 || currzipcode>999999){
      alert("Enter Valid ZipCode")
    }else{
      
    let obj={name:currname,
      contactNumber:currcontactnumber,
      city:currcity,
      landmark:currlandmark,
      street:currstreet,
      state:currstate,
      zipCode:currzipcode,}
      console.log(obj)
   try{
    let res= await axios.post("http://localhost:3001/api/v1/addresses",JSON.stringify(obj),{headers:{
      "content-type":"application/json",
      'x-auth-token': `${token}`,
    }})
    alert("Adress Add Successfully")
   }catch(err){
    console.log('err > '+err)
   }
   handleCloseAddressModal()
   window.location.reload()
    }
  }
  return (
    <div>
      <Header clickAddAddress={handleOpenAddressModal} clickAddProduct={handleOpenProductModal} role={localStorage.getItem("role")} />
      <ImageList
        sx={{ width: "80%", height: "100%", ml: "18%" }}
        cols={3}
        rowHeight={164}
      >
        {products}
      </ImageList>
      <Modal
        open={openProduct}
        onClose={handleCloseProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
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
                  Add Product
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleProduct}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="productName"
                        required
                        fullWidth
                        id="productName"
                        label="Product Name"
                        inputProps={{ maxLength: 50, minLength: 5 }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Categories
                        </InputLabel>
                        <Select
                          name="categories"
                          id="demo-simple-select"
                          value={age}
                          label="Categories"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Electronics"}>Electronics</MenuItem>
                          <MenuItem value={"Men's wear"}>Men\'s wear</MenuItem>
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
                        label="price"
                        name="price"
                        autoComplete="price"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="itemAvailablity"
                        label="itemAvailablity"
                        type="number"
                        id="itemAvailablity"
                        autoComplete="itemAvailablity"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="imageURL"
                        label="imageURL"
                        type="url"
                        id="imageURL"
                        autoComplete="imageURL"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="manufacturer"
                        label="manufacturer"
                        type="name"
                        id="manufacturer"
                        autoComplete="manufacturer"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <textarea
                        id="productDesc"
                        name="productDesc"
                        rows={6}
                        cols={45}
                      ></textarea>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Product
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 2 }} />
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
      <Modal
        open={openAddress}
        onClose={handleCloseAddressModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
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
                  Add Address
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleAddress}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ maxLength: 50, minLength: 0 }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="contactnumbere"
                        name="contactnumber"
                        required
                        fullWidth
                        type="number"
                        id="contactnumber"
                        label="Contact Number"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        inputProps={{ maxLength: 50, minLength: 0 }}
                        autoComplete="city"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        name="landmark"
                        label="Landmark"
                        id="landmark"
                        autoComplete="landmark"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="street"
                        label="Street"
                        type="name"
                        id="street"
                        autoComplete="street"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="state"
                        label="State"
                        type="name"
                        id="state"
                        autoComplete="state"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        name="zipcode"
                        label="Zip-Code"
                        type="number"
                        id="zipcode"
                        autoComplete="zipcode"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Adsress
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 2 }} />
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default Products;

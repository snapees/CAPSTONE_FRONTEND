import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../showorder/ShowOrder.css'
const ShowOrder = () => {
  const Navigate= useNavigate();
  const { id }  = useParams();



  //adding the quantity
  const Change = ()=>{
addQuantity(quantity+1)
  }
  //removing the quantity 
  const Change1 = ()=>{
    addQuantity(quantity-1);
  }

   
  const [product, setProduct] = useState(null);
const[address,setAddress] = useState([])
  const[quantity,addQuantity] = useState(0)
  const[order,setOrder] = useState(false);
  const Change2 =async ()=>{
    setOrder(true);
    document.getElementById('plus').style.display='none'
    document.getElementById('minus').style.display='none'
        try {
            let userID = localStorage.getItem('userId')
          const response = await axios.post(
            "http://localhost:3001/api/v1/orders",
            { quantity: quantity,
            product:product._id,
            address:address[0]._id,
            user:userID
            },
            {
              headers: {
                'x-auth-token': `${token}`,
                "content-type":"application/json",
              },
            }
          );
    
          if (response.data) {
            window.alert("Success");
          }
        } catch (error) {
          console.log("useeffect send data")
          window.alert("Error");
        }
    }
//fetching the product 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
        const { data } = response;
        setProduct(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  //fetching the address
  const token = localStorage.getItem('token');
    useEffect(()=>{
    const ShowData =async ()=>{
        try {
           const response = await axios.get('http://localhost:3001/api/v1/addresses',
           {headers: {'x-auth-token': `${token}`}}
           )
            const {data} = response;
            setAddress(data);
        } catch (error) {
            console.log(error);
        }
    }
    ShowData();
  },[])
//   adding the quantity 

  return (
    //showing the product
    <div>
      {product ? (
        <>
        <div className='container' style={{width:'60%',position:"relative",left:"5.5%",overflow:"hidden"}}>
        <div className='check'>
        <img className='image' src={product.imageURL} alt="images"/>

        </div>
        <div className='section'>
        <div>name : <span className='changes'>{product.name}</span></div>
          <div>Description :<span className='changes'> {product.description}</span> </div>
         
          <div>price :<span className='changes'>{product.price}rs</span> </div>
          <div>category :<span className='changes'>{product.category}</span> </div>
          <br></br>
    
          <button className='orderBtn' onClick={Change} id='plus'> + </button>

<div style={{textAlign:"center"}} >{quantity}</div>
<div>{quantity<0 && <div style={{color:"red"}}>quantity cannot be in minus</div>}</div>
<div>{quantity===0 && <div  style={{color:"red"}}>quantity cannot be zero </div>}</div>
     <button className='orderBtn' onClick={Change1} id='minus'> - </button>
     <button className='orderBtn' onClick={Change2}> setQuantity </button>
        </div>
   
   
        </div>
 <div className="container" style={{width:'60%',position:"relative",left:"5.5%",overflow:"hidden"}}>
 {address.map((val,index)=>{
    return(
        <div className='section'>
        <h2 style={{marginBottom:"-5px"}}>Address</h2>
        <div key={index}>Full name : <span className='changes'>{val.name}</span></div>
        <div >contactNumber : <span className='changes'>{val.contactNumber}</span></div>
        <div >city : <span className='changes'>{val.city}</span></div>
        <div >landmark : <span className='changes'>{val.landmark}</span></div>
        <div >street : <span className='changes'>{val.street}</span></div>
        <div >state : <span className='changes'>{val.state}</span></div>
        <div >zipCode : <span className='changes'>{val.zipCode}</span></div>

     
        </div>

    )
 })}
    </div>
</>
     
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowOrder;

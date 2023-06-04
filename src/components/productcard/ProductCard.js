import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function ProductCard(props) {
  const role = localStorage.getItem("role");
  
  if (role == "admin") {
    return (
      <Card sx={{ maxWidth: 345,height:480,pt:2,mb:3 , border: "2px solid orange" }}>
        <img src={props.imgUrl} height={"300px"} width={"300px"} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{height:20,overflow:'hidden'}}>
            {props.desc}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{height:20,overflow:'hidden'}}>
            {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>{props.dltClick(props.id)}} size="small">Delete</Button>
          <Button onClick={()=>{props.navToProduct(props.id)}} size="small">Modify</Button>
        </CardActions>
      </Card>
    );
  }else if(role=='user'){
    return (
      <Card sx={{ maxWidth: 345,height:480,pt:2,mb:3 , border: "2px solid orange" }}>
        <img src={props.imgUrl} height={"300px"} width={"300px"} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{height:20,overflow:'hidden'}}>
            {props.desc}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{height:20,overflow:'hidden'}}>
            {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>{props.navToProduct(props.id)}} size="small">Buy Now</Button>
          
        </CardActions>
      </Card>
    );
  }
}

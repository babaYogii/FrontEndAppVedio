import { Typography, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import errorimg from "../assets/error-img.png";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";


const ErrorComponent = () => {
   const navigate=useNavigate();



    return (
        <Container>
            <Box sx={{ display: "flex", alignItems: "center", height: "100vh", justifyContent: "center", flexDirection: "column" }}>
                <Box className="error-img" component="img"
                    sx={{
                        display: "flex", flexDirection: "row",
                    }} src={errorimg}></Box>
                {/* <Typography sx={{fontFamily:['apple-system'], fontSize:60, textAlign:"center", fontWeight:"bold", color:"#00A86B"}}>This is not the page you are looking for :(</Typography> */}
                <Typography sx={{ fontFamily: ['apple-system'], fontSize: 30, fontWeight: 600, textAlign: "center", color: "black" }}>Go to Home Page <Button onClick={()=>{
                       navigate('/main') 
                }} > <HomeIcon   color='secondary' sx={{ mr: 1, mb: 1, width: 50, height: 50 }}></HomeIcon></Button></Typography>
            </Box>
        </Container>
    )
}

export default ErrorComponent;
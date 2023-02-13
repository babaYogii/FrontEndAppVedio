import {  Box, Typography, Button, Container } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {

  document.title="Home page - Tech Teams"
  
  const navigate=useNavigate();

  return (
    <div className=" ">
      <Navbar />
      <Container>

        <Box sx={{ display: "flex", alignItems:"center",height:"100vh"}} >
          <Box sx={{ display: "flex", flexDirection: "column" }}>

            <Typography variant="h1" component="h2" fontWeight={600} color="#00A86B" >
              Tech Meets
            </Typography>
            <Typography variant="h3" component='h2'>
              Safe. Secure. Free
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center' }} >
              <Button variant="contained" sx={{
                minWidth: "20rem", maxWidth: "20rem", backgroundColor: "#00A86B",
                m: '2rem', padding: "10px", border: "3px solid #00A86B", "&:hover": { backgroundColor: "#00A86B", color: "white" }
              }}
              onClick={()=>{navigate('/signIn')}}
              >
                Sign In
              </Button>
              <Button variant="contained"
                sx={{
                  minWidth: "20rem", maxWidth: "20rem", 
                  backgroundColor: "white", color: "#00A86B", ml: '2rem', mb: '2rem', padding: "10px",
                  border: "3px solid #00A86B", "&:hover": { backgroundColor: "white" }
                }}
                onClick={()=>{navigate('/signup')}}     
                >
                SignUp for free
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      
       

    </div>
  );
};

export default Home;

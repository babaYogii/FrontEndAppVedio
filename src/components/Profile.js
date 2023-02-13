import React from "react";
import { Avatar, Box, Divider, Container, TextField, Typography, Grid,Paper } from '@mui/material';
import img from "../assets/icon.png";
//import img from "../assets/user.jpg";


const UserProfile = () => {
    
    
    let user=localStorage.getItem('user');
    user=JSON.parse(user)
    console.log(user)




    return (
        <>
            <Container maxWidth="md" sx={{mt:20,px: 10, }}>
                
                <Paper  elevation ={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={4} sx={{background: 'linear-gradient(#55fa91,#3fcc75,#00A68B )'}} >
                            <Avatar sx={{ width: 130, height: 130, m:7 }} src={img}/>
                         
                        </Grid>
                        <Grid item xs={6} md={8} >
                            <Box sx={{mx:6}}>
                            <Typography variant='h5' component='h3' color="#00A86B" align="center"  sx={{mt:3,mb:1}}>Information</Typography>
                             <Divider variant="middle"  />
                            <Typography variant="h6" component='h4' sx={{ mt: 5, mb: 3 }}>First Name  : <TextField variant="standard" fullWidth value={"  "+(user.firstName).toUpperCase()} /></Typography>
                            <Typography variant="h6" component='h4' sx={{ py: 3 }}>Last Name  : <TextField variant="standard" fullWidth value={"  "+(user.lastName).toUpperCase()} /></Typography>
                            <Typography variant="h6" component='h4' sx={{ my: 3,mb:6 }}>Email  : <TextField variant="standard" fullWidth value={"  "+(user.email)}></TextField></Typography>
                            {/* <Typography variant="h6" component='h4' sx={{ py: 6 }}>Contact Number  : <TextField variant="standard" fullWidth value={" "+user.conatactNumber}>{localStorage.getItem("contactNumber")}</TextField></Typography> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                
            </Container>
        </>
    )
}
export default UserProfile;
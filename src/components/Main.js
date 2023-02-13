import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from '../utility/Carousel/CarouselMain';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

import './Main.css'








const Main = () => {

    const navigate = useNavigate()


    React.useEffect(() => {
      document.title="Tech Meets"
    
      
    }, [])
    

    const handelSubmit = () => {
        navigate('/createmeeting')
    }

    
  

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap',mt:24 }}>
            <Box sx={{ flex: 1, paddingX: 12,pt:5 }} >
                <Box>
                    <Typography variant='h3' component='h6' sx={{ paddingY: 0.5, pb: 0, fontSize: '3em',fontWeight:400 }}>Premium video meetings.</Typography>
                    <Typography variant='h3' component='h6' sx={{ paddingY: 3, pt: 0, fontSize: '2.8em',fontWeight:300 }}>Now free for everyone.</Typography>
                 
                </Box>
                <Box sx={{}}>
                    <Typography variant='body1' sx={{  color: "rgba(0, 0, 0, 0.5)", fontSize: "1.2em" }}>We re-engineered the service we built for secure business meetings,</Typography>
                    <Typography variant='body1' sx={{   color: "rgba(0, 0, 0, 0.5)", fontSize: "1.2em" }}>Tech Meet, to make it free and available for all.</Typography>
                </Box>
                <Box display='flex' sx={{ mb: 5, mt: 5 }}>
                    <Button
                        onClick={handelSubmit} sx={{ backgroundColor: "#00A86B", border: "2px solid #00A86B", '&:hover': { background: 'none', color: "#00A86B", border: "2px solid #00A86B" } }}
                        variant="contained"><VideoCameraFrontIcon/>  Create Meeting</Button>
                </Box>
                <hr />
                <Typography sx={{margin:3}}>Learn More</Typography>
            </Box>





            <Box sx={{ flex:1 }} >
                <Carousel />
            </Box>

        </Box>
    )
}

export default Main
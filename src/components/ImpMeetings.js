import { Box, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import {getMeetings} from '../Helper/Axios/axiosCreateMeeting'

const ImpMeetings = () => {

    const [impMeetings,SetimpMeetings]=React.useState([]);


    useEffect(()=>{
        async function fun(){

            let result = await getMeetings(); 
            SetimpMeetings(result.data);
        }
        fun() 
    },[])

    

    
    




  return (
    <Paper sx={{width:500,height:"87vh",mt:10,mb:1, paddingY: 1,paddingX:6,overflowY: "scroll"}} elevation={7} >
        {/* <Typography variant='h5' align='center' color='primary'>Important meetings</Typography> */}
        <Typography variant='h4' component='h6' align='center' color='#00A86B'>Important Meetings</Typography>

        {impMeetings.length>0 ? impMeetings.map(elem => 
        
        
        (
            elem.imp ?
            
                    <Grid item xs={3} key={impMeetings.indexOf(elem)}>
                        <Box  >

                            <CardContent>
                                <Typography variant="body" gutterBottom color='#00A86B'>
                                    <Typography sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>

                                        <CardHeader
                                            title={` ${(elem.meetingName).toUpperCase()}`}
                                            subheader={`Schedule Date : ${new Date(parseInt(elem.scheduleDate))}`}
                                        />
                                    </Typography>
                                     
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid>:" "
                ))
                : <Typography variant='body1' align='center'mt={15} >No important meetings</Typography> }

    </Paper>
  )
}

export default ImpMeetings
import { Box, Button, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getMeetings } from '../Helper/Axios/axiosCreateMeeting'
import LoadingBar from 'react-top-loading-bar';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import CopyToClipboard from 'react-copy-to-clipboard';
import { deleteMeeting } from '../Helper/Axios/axiosMeeting';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactJsAlert from "reactjs-alert";
import VideocamIcon from '@mui/icons-material/Videocam';
import { useNavigate } from 'react-router-dom';










const MyMeetings = () => {

    const [meetings, setMeetings] = useState([]);
    const [progress, setProgress] = useState(0);
    const navigate=useNavigate();

    //Alert States
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("");

    //Alert states Ended



    async function getdata() {
        setProgress(20);
        setProgress(50)
        let result = await getMeetings();
      
        
        setProgress(70)
        setMeetings(result.data);
        setProgress(100)
    }

    useEffect(() => {
        document.title = "Meetings - Tech Teams"
        getdata();
    }, [])




    const deleteMeetings = async (id) => {

        let response = await deleteMeeting(id);
        if (response.status === 200) {

            setTimeout(()=>{
                setStatus(true);
                setType("error");
                setTitle("Meeting deleted!");
            },3000)
        }
        getdata();

    }

// console.log(meetings[0].scheduleDate);




    return (
        <Container maxWidth="md" >
            <LoadingBar
                color='#00A86B'
                height='4px'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />


            {meetings.length > 0 ? <Grid container
                direction="column"
                justifyContent="center"
                alignItems="strecth"
                flexWrap='wrap'
                spacing={4} sx={{ mt: 10 }}>
                {meetings && meetings.map(elem => (
                    <Grid item xs={4} key={meetings.indexOf(elem)} >
                        <Box sx={{
                            boxShadow: "2px 8px 12px 0px #11C382",
                            borderRadius: 2.5
                        }}>

                            <CardContent>
                                <Typography variant="body" gutterBottom color='#00A86B'>
                                    <Typography sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>

                                        <CardHeader
                                            title={` ${(elem.meetingName).toUpperCase()}`}
                                            subheader={`Schedule Date : ${new Date(parseInt(elem.scheduleDate))}`}
                                        />
                                        <DeleteIcon  cursor="pointer" ripple onClick={() => { deleteMeetings(elem._id) }} sx={{ mr: 7, mb: 5 }} color='#fff' />
                                    </Typography>
                                        <Typography  variant="body1" color="#808080" sx={{ pl: 2, mb: 1 }} >{`Meeting Size: ${elem.sizeOfMeeting}`}</Typography>
                                        <Typography  variant="body1" color="#808080" sx={{ pl: 2, mb: 1 }} >{`Important : ${elem.imp ? "Yes":"No"}`}</Typography>
                                    <Typography color="#808080" variant="subtitle1" style={{ paddingLeft: 17 }}>{`Meeting URL: ${elem.meetingUrl}`} <CopyToClipboard text={`${elem.meetingUrl}`}>
                                        <Button ><ContentCopyTwoToneIcon color="#808080"></ContentCopyTwoToneIcon></Button>
                                    </CopyToClipboard>
                                    </Typography>
                                   
                                <Button color="primary" sx={{ml:2,mt:1}} size="small" variant="contained" onClick={() => { navigate('/joinnow') }}>
                                     <VideocamIcon color='white' sx={{ mr: 1 }}></VideocamIcon> Join Now</Button>
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid>
                ))}
                <ReactJsAlert
                    status={status} 
                    type={type} 
                    title={title}
                    quotes={false}
                    Close={() => setStatus(false)}
                />
            </Grid>
                :
                <>
                <Typography variant='h3' component='h1' sx={{marginTop:15}}>Create your first Meeting</Typography>
                <Button onClick={()=>{navigate('/createmeeting')}}>Create meeting</Button>
                </>

            }
        </Container>


    )
}

export default MyMeetings






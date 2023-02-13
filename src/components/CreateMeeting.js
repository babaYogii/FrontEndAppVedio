import { Paper, Box, TextField, Button,  Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material'
import { axiosCreateMeeting } from '../Helper/Axios/axiosCreateMeeting';
// import Room from './Room'
import ReactJsAlert from "reactjs-alert";
import GroupsIcon from '@mui/icons-material/Groups';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LoadingBar from 'react-top-loading-bar';







const CreateMeeting = () => {

  const navigate = useNavigate();


  //Alert States
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);

  const [type, setType] = useState("success");
  const [title, setTitle] = useState("User created successfully");

  //Alert states Ended
  const [errors, setErrors] = useState("");
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({
    "meetingName": "",
    "sizeOfMeeting": null,
  })

  const [date, setDate] = useState();


  useEffect(() => {
    document.title = "Create Meeting - Tech Teams"
    if (Object.keys(errors).length === 0 && validated) {
      navigate('/createmeeting')
    }
    // eslint-disable-next-line
  }, [errors])


 

  const handelInputs = (e) => {
    setInputs((prevstate) => ({
      ...prevstate, [e.target.name]: e.target.value
    }))
  }

  const handelSubmit = async (e) => {
     setProgress(20);
    e.preventDefault();
    setErrors(validate(inputs));
    setProgress(40)

    setValidated(true);
    let milisecDate = Date.parse(date).toString()
    console.log(milisecDate)
    setProgress(50)
    try {
      let response = await axiosCreateMeeting({ ...inputs, "scheduleDate": milisecDate })
      if (response.status === 201) {
        setStatus(true);
            setType("success");
            setTitle("Meeting Created");
            setProgress(70)
      }
      setProgress(100)
    } catch (error) {
      
      console.log(error)
           setStatus(true);
            setType("error");
            setTitle("Invalid Inputs");
    }
    setProgress(100)
  }


  const validate = (inputs) => {
    console.log(inputs.meetingName);
    const req = {}
    if (!inputs.meetingName) {
      req.meetingName = 'Meeting name is required'
    }
    if (inputs.sizeOfMeeting > 15) {
      req.sizeOfMeeting = "Size cannot be greater than 15"
    }
    if (!inputs.scheduleDate) {
      req.scheduleDate = "Please enter the date and time"
    }

    return req;

  }



  return (
    <Container sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: "center" }}  >
   
   <LoadingBar
                color='#00A86B'
                height='4px'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />



      <Paper elevation={5} gap={1} sx={{ mt: 20, padding: 6, width: 500, }}>
        <Typography variant='h4' component='h6' align='center' color='#00A86B'>Create Meeting</Typography>
        <TextField variant='standard' required fullWidth autoComplete="off"
          name='meetingName' onChange={handelInputs} label="Meeting Name" sx={{ marginTop: "8px", marginBottom: "2px", color: "#00A86B" }} />

        <TextField variant='standard' required fullWidth autoComplete="off" type='number' style={{ color: "#00A86B" }}
          name='sizeOfMeeting' onChange={handelInputs} label="Number of Participants" sx={{ marginY: "4px", marginTop: "4px", color: "#00A86B" }} />

        <TextField variant='standard' required fullWidth autoComplete="off"  type='datetime-local' sx={{ marginY: "8px" }}
          name='scheduleDate' onChange={(e) => { setDate(e.target.value) }} />

        <Box sx={{ dispaly: "flex", marginTop: 1 }}>
          <Button
            onClick={handelSubmit} sx={{ my: 2, backgroundColor: "#00A86B", border: "2px solid #00A86B", '&:hover': { background: 'none', color: "#00A86B", border: "2px solid #00A86B" },mx:1,mr:3 }}
            variant="contained"><VideoCallIcon color='white' sx={{mr:1}}/>Create Meeting</Button>
          
          <Button
            onClick={() => {
              navigate('/Mymeetings')
            }} sx={{ my: 2, backgroundColor: "#00A86B", border: "2px solid #00A86B", '&:hover': { background: 'none', color: "#00A86B", border: "2px solid #00A86B" }, }}
            variant="contained"><GroupsIcon color='white' sx={{mr:1}} />My Meetings</Button>
        </Box>
      </Paper>
      <ReactJsAlert
          status={status} // true or false
          type={type} // success, warning, error, info
          title={title}
          quotes={false}
          Close={() => setStatus(false)}
        />

    </Container>
    

  )
}

export default CreateMeeting










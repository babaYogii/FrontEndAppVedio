import { Paper, Box, TextField, Button, Typography, FormControlLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material'
import { axiosCreateMeeting } from '../Helper/Axios/axiosCreateMeeting';
// import Room from './Room'
import ReactJsAlert from "reactjs-alert";
import GroupsIcon from '@mui/icons-material/Groups';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LoadingBar from 'react-top-loading-bar';
import Switch from '@mui/material/Switch';
import { ReactMultiEmail} from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import ImpMeetings from './ImpMeetings';


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';






const CreateMeeting = () => {

  const navigate = useNavigate();


  //Alert States
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);

  const [type, setType] = useState("success");
  const [title, setTitle] = useState("");
  const [emails, setEmails] = React.useState([]);
  const [imp, Setimp] = useState(false);



  //Alert states Ended
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({
    "meetingName": "",
    "sizeOfMeeting": null,
    "meetingDescription":""
  })

  const [date, setDate] = useState(dayjs(new Date()).add(7, 'm').format('LLL'));


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

    // console.log(imp)
    setValidated(true);
    let milisecDate = Date.parse(date).toString()
    setProgress(50)
    try {
      let response = await axiosCreateMeeting({ ...inputs, "scheduleDate": milisecDate, imp })
      console.log(response)
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
      if(error.response.message){
      setTitle(error.response.data.message);
    }else{
      setTitle(error.response.data.error)
    }
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
    if (!emails) {
      req.emails = 'Enter minimum one recipient'
    } else if (emails.length > parseInt(inputs.sizeOfMeeting)) {
      req.emails = "emails cannot be greater than number of participants"
    }
  
    return req;

  }


  return (
    // <Container  sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexWrap: 'wrap', gap: 2, overflow: 'hidden' }}  >
  <Box display='flex' alignItems='center' justifyContent='center' flexWarp='wrap' gap={6}>

      <LoadingBar
        color='#00A86B'
        height='4px'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Paper elevation={7} sx={{ mt: 10, mb: 2, paddingY: 1,paddingX:6, width: 500 }}>
        <Box display='flex' flexDirection='column'  gap={1.6} >

          <Typography variant='h4' component='h6' align='center'  color='#00A86B'>Create Meeting</Typography>
          <TextField variant='standard' required fullWidth autoComplete="off" autoFocus
            name='meetingName' onChange={handelInputs} label="Meeting Name" sx={{ color: "#00A86B" }} />
          {(errors.meetingName && (!inputs.meetingName)) && <Typography variant='caption' color='red'>{errors.meetingName}</Typography>}

          <TextField variant='standard' required fullWidth autoComplete="off" type='number' style={{ color: "#00A86B" }}
            name='sizeOfMeeting' onChange={handelInputs} label="Number of Participants (Max : 15)" sx={{ color: "#00A86B" }} />
          {(errors.sizeOfMeeting && (!inputs.sizeOfMeeting || inputs.sizeOfMeeting > 15)) &&
            <Typography variant='caption' color='red'>{errors.sizeOfMeeting}</Typography>}


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} variant='standard' fullWidth />}
              label="Schedule Date"
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
              minDateTime={dayjs(new Date())}
              />
          </LocalizationProvider>


          <Typography component='span' variant='caption' sx={{ mb: 0 }} >Enter recipient emails</Typography>
          <ReactMultiEmail
            label="Recipient"
            placeholder='Enter recipient emails'
            emails={emails}
            onChange={(emails) => {
              setInputs((prevstate) => ({
                ...prevstate, emails
              }));
            }}
            // focused={false}
            style={{ label: 'Recipient minimum 1',fontWeight:400 ,fontSize: '1em', padding: '2px',marginTop:0}}
            // focused
            autoFocus
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            getLabel={(email, index, removeEmail) => {
              return (
                <div data-tag key={index}>
                  <div data-tag-item>{email}</div>
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
            />
          {(errors.emails && (!inputs.emails)) && <Typography variant='caption' color='red'>{errors.emails}</Typography>}
          <br />
          <TextField variant="outlined" style={{ textDecoration: 'none' }} overflow='hidden' fullWidth label='Meeting Description' autoComplete="off" type='text' multiline={true} minRows={3} maxRows={3} sx={{mt:-2}}
          name="meetingDescription" onChange={handelInputs}  />

          {inputs.meetingDescription.length >= 301 ?
          <Typography variant='span'fontSize={12} m={0} color="#008b8b">Description must be small and simple (300 character)</Typography>:inputs.meetingDescription.length+'/300'}

          <FormControlLabel control={<Switch size="small" onChange={() => { Setimp(!imp) }} />} label="Mark as important" />

          <Box sx={{ dispaly: "flex", }}>
            <Button
              onClick={handelSubmit} sx={{ my: 2, backgroundColor: "#00A86B", border: "2px solid #00A86B", '&:hover': { background: 'none', color: "#00A86B", border: "2px solid #00A86B" }, mx: 1, mr: 3 }}
              variant="contained"><VideoCallIcon color='white' sx={{ mr: 1 }} />Create Meeting</Button>


            <Button
              onClick={() => {
                navigate('/Mymeetings')
              }} sx={{ my: 2, backgroundColor: "#00A86B", border: "2px solid #00A86B", '&:hover': { background: 'none', color: "#00A86B", border: "2px solid #00A86B" }, }}
              variant="contained"><GroupsIcon color='white' sx={{ mr: 1 }} />My Meetings</Button>
          </Box>
        </Box>
      </Paper>




      <ImpMeetings />








      <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        quotes={false}
        Close={() => setStatus(false)}
        />
</Box>

    // </Container>


)
}

export default CreateMeeting










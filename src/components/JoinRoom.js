import { Box, TextField, Container, Button, Typography } from "@mui/material";
//import{makeStyles} from "@mui/styles"
import React, { useState, useEffect } from "react";
import { isUrlValid } from '../Helper/Axios/axiosCreateMeeting'
import ReactJsAlert from "reactjs-alert";


// const useStyles = makeStyles({

//     button: {
//       backgroundColor: '#00A86B',
//       color: '#fff',
//       '&:hover': {
//         backgroundColor:  '#00A86B',
//         color: 'white',
//     },
//   }})




const JoinRoom = () => {
    //const classes = useStyles()

    const [inputs, setInputs] = useState({
        meetingUrl: "",
        userName: "",

    });

    //Alert States
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("User created successfully");

    //Alert states Ended

    // eslint-disable-next-line
    const [url, seturl] = useState('http://');
    const [error, setError] = useState(false);


    const [checkvalidurl, setValidurl] = useState(false);




    useEffect(() => {
        document.title = "Join Room - Tech Teams"
        seturl('http://' + inputs.meetingUrl)


    }, [inputs.meetingUrl, error])




    const handelChange = (e) => {
        setInputs((prevstate) => ({
            ...prevstate, [e.target.name]: e.target.value,
        }))
        if (inputs.userName.length < 2 || inputs.userName.length > 20) {
            setError(true);
        } else {
            setError(false)
        }
        // seturl('http://' + inputs.meetingUrl)


    }




    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!error) {
            try {
                let response = await isUrlValid(inputs.meetingUrl);
                if (response.status === 200) {
                    setValidurl(true);
                    const url = `http://${inputs.meetingUrl}`
                    window.open(url, "_blank");
                }
            } catch (err) {
                // alert(error.);
                status(true)
               setType('error');
               setTitle("Invalid url")

            }
        } else {
            alert("Error in user name")
        }


    }



    return <>
        <Container maxWidth="sm">
            <Box component='form' noValidate id='joinroom'
                sx={{
                    mt: 20, px: 10, mb: 10,
                    alignItems: 'center',
                    boxShadow: 6,
                    borderRadius: 2.5,
                }}>

                <TextField variant='standard' margin="normal" onChange={handelChange}
                    required fullWidth id='username' name='userName' label='Username' sx={{ mt: 5 }} />
                {error ? <Typography fontSize={12} color='red'>Name is required</Typography> : ""}
                <TextField variant='standard' margin="normal" onChange={handelChange} disabled={checkvalidurl}
                    required fullWidth id='meeting-link' name='meetingUrl' label='Meeting Link' />

                {

                    !checkvalidurl
                        ?
                        <Button variant="contained" onClick={handelSubmit} sx={{
                            border: "2px solid #00A86B", color: "#fff", background: '#00A86B', m: 2,
                            "&:hover": { backgroundColor: "white", color: "#00A86B", border: "2px solid #00A86B" }
                        }}>
                            Validate Url </Button> :

                        //    <Link href={url} color="inherit" >
                        //    Join Now
                        //  </Link>
                        <a href={`http://${inputs.meetingUrl}`} target="_blank" rel="noreferrer"> join now</a>

                }
                <ReactJsAlert
                    status={status} // true or false
                    type={type} // success, warning, error, info
                    title={title}
                    quotes={false}
                    Close={() => setStatus(false)}
                />
            </Box>
        </Container>
    </>
}
export default JoinRoom;
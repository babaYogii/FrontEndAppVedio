import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, TextField, Typography} from '@mui/material';
import ReactJsAlert from "reactjs-alert";
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import axiosSignin from '../Helper/Axios/axiosSignIn';
import LoadingBar from 'react-top-loading-bar'


const Signin = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const[progress,setProgress]=useState(0)

   //Alert States
   const [status, setStatus] = useState(false);
   const [type, setType] = useState("success");
   const [title, setTitle] = useState("User created successfully");

   //Alert states Ended


    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(errors).length === 0 && validated) {
            // navigate('/')
        }
        // eslint-disable-next-line
    }, [errors])

    useEffect(()=>{

        document.title="SIGNIN - Tech Teams"
       let a=localStorage.getItem('token')
        if(a){
            navigate('/main')
           }
      
       
    },[navigate])




    const handelSubmit =async  (e) => {
        setProgress(20)
        e.preventDefault();
        console.log(errors)
        setErrors(validate(inputs));
        setValidated(true);
        setProgress(40)
        console.log(inputs)
        // let response=await axiosSignin(inputs)
        // console.log(response,'from main')
        // if(response.status===200){
            //     localStorage.setItem('user',JSON.stringify(response.data.user));
            //     localStorage.setItem('token',response.data.token);
            //     navigate('/createmeeting');
            // let error="";
            // }
            try{
                let response=await axiosSignin(inputs);
                localStorage.setItem('user',JSON.stringify(response.data.user));
                setProgress(60)
                setProgress(80)
            localStorage.setItem('token',response.data.token);
            setProgress(100)
            setTimeout(() => {
                navigate('/main')
              }, 2000)
              setStatus(true);
            setType("success");
            setTitle("Sign In Successful!");



            
        }catch(error){
        

          setStatus(true);
            setType("error");
            setTitle("Invalid credentails");

        }
               
    }



    const validate = (values) => {
        const req = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        if (!values.email) {
            req.email = "Please enter the email"
        } else if (!regex.test(values.email)) {
            req.email = "Not a valid email"
        }
        if(!values.password){
            req.password="Please enter the password"
        }else if(!regularExpression.test(values.password)){
            req.password="Not a valid password"
        }
        return req;
    }

    const handelInputs = (e) => {
        setInputs((prevstate) => ({
            ...prevstate, [e.target.name]: e.target.value
        }))
    }





    const papperStyle = { padding: '40px 40px', width: '60%', maxWidth: '400px', margin: '10px auto', marginBottom: '20px',marginTop:"120px" }
    return <>
            <Grid >
            <LoadingBar
        color='#00A86B'
        transitionTime='600'
        height='4px'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
                <Paper elevation={20} style={{ ...papperStyle }}>
                    <Grid align="center" >
                        
                        <Typography variant='h4' component='h2' color='primary'>Sign In</Typography>
                        <Typography variant='caption' >Login Here</Typography>
                    </Grid>
                    <form noValidate onSubmit={handelSubmit} >
                        <Box display='flex' gap={1} flexDirection="column">
                            <TextField variant='standard' required fullWidth autoComplete="off"
                                name='email'
                                onChange={handelInputs}
                                label="Email"></TextField>
                            {(errors.email || !inputs.email) && <Typography variant='caption' color='red'>{errors.email}</Typography>}
                            <TextField variant='standard' required fullWidth autoComplete="off" name='password'
                                onChange={handelInputs}
                                label="Password" type='password'></TextField>
                            {(errors.password || (!inputs.password)) && <Typography variant='caption' color='red'>{errors.password}</Typography>}

                            <Button type='submit' variant='contained' color="primary" sx={{m:2}}  >Sign In</Button>
                        </Box>
                    </form>
                    <Box display='flex' flexDirection="column" textAlign="center" gap={1} >
                        <Typography variant='body2' mt={1} color='black'>Don't have an account ?  <Link to='/signup' style={{ textDecoration: 'none',color:'#00A86B' }}>Sign Up</Link>
                        </Typography>
                        <Typography variant='body2' mt={1} m={1} color='black'>Back to Home page  <Link to='/' style={{ textDecoration: 'none',color:'#00A86B' }}>Home</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <ReactJsAlert
          status={status} // true or false
          type={type} // success, warning, error, info
          title={title}
          quotes={false}
          Close={() => setStatus(false)}
        />
    </>
}

export default Signin
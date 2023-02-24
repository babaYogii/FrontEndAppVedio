import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import ReactJsAlert from "reactjs-alert";
import { Link, useNavigate } from 'react-router-dom';
import signup from "../Helper/Axios/axiossignup";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';









const Signup = (auth) => {



    //Alert States
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("Something went wrong");

    //Alert states Ended

    const navigate=useNavigate();

  
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

  

    const handelChange = (e) => {
        setInputs((prevState) => ({
            ...prevState, [e.target.name]: e.target.value, isPermenant: e.target.checked
        }))
    }


  useEffect(()=>{
    let a=localStorage.getItem('token')
    if(a){
     navigate('/main')
    }
 },[navigate])
 


    const [errors, setErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    useEffect(() => {
        document.title="SIGNUP - Tech Teams "
       
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log(inputs);
        }
        // eslint-disable-next-line
    }, [errors])



    const handelSubmit =async  (e) => {
        e.preventDefault();
        setErrors(validate(inputs));
        // console.log(inputs)
        
        ///Alert function
        try{
            
            let response= await signup(inputs);
            
            console.log(response)

            if(response.status===201){
                setStatus(true);
                setType("success");
                setTitle("Sign Up Successful!");
                if(response.status===201){
                setTimeout(() => {
                    navigate('/signin')
                  }, 2000)
                       setStatus(true);
                setType("success");
                setTitle("Sign Up Successful!");
                }
                setInputs({firstName: "",
                lastName: "",
                email: "",
                password: "",
                contactNumber: "",confirmPassword:""})
            }
            if( response.status===400){
                setStatus(true)
                setType("error");
                setTitle(response)
            
            }
            if(response.status===404){
                navigate('/signin')
                setStatus(true)
                setType('error');
                setTitle("User already exist")
            }
        }catch(error){
               console.log(error)
            setStatus(true);
            setType("error");
            if(error.response.data.message){
                setTitle(error.response.data.message);
            }else{
                setTitle(error.response.data.error);
            }

        }


        //Alert function Ended
       
        setisSubmit(true);
     
      
        
    }


    const validate = (values) => {
        const notFill = {};
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            notFill.firstName = "First Name is required"
        } else if (values.firstName.length < 2) {
            notFill.firstName = "Name cannot be less than 2 characters"
        }
        if (!values.lastName) {
            notFill.lastName = "Last Name is required"
        }
        if (!values.email) {
            notFill.email = "Email is required"
        } else if (!regex.test(inputs.email)) {
            notFill.email = "Enter valid email"
        }
        if(!values.password){
            notFill.password="Please enter the password"
        }else if(!regularExpression.test(values.password)){
            notFill.password="1 special character \n Less than 10 character and greater than 6 character \n1 small case "
        }
        if (values.password !== values.confirmPassword) {
            notFill.confirmPassword = "Password and confirm password does not match"
        }
       
        return notFill;
    }



    // const navigate = useNavigate();
    

    const papperStyle = { padding: '20px 40px', maxWidth: '400px' ,margin: '0px auto', marginBottom: '20px',marginTop:"120px" }
    return <>
            <Grid mt={'6vh'} >
                <Paper elevation={20} style={{ ...papperStyle, width: '60%' }}>
                    <Grid align="center">
                        
                        <Typography variant='h4' component='h2' color='primary'>Sign Up</Typography>
                        {/* <Typography variant='caption'>Registere Here</Typography> */}
                    </Grid>
                    <form noValidate onSubmit={handelSubmit}>
                        <Box display='flex' gap={0.7} flexDirection='column'  >

                            <TextField variant='standard' value={inputs.firstName} name="firstName" onChange={handelChange}
                                required  autoComplete="off" label="First Name"></TextField>
                            {(errors.firstName && (!inputs.firstName || inputs.firstName.length < 2)) && <Typography variant='caption' color='red'>{errors.firstName}</Typography>}


                            <TextField variant='standard' value={inputs.lastName} name="lastName" onChange={handelChange}
                                required fullWidth autoComplete="off" label="Last Name"></TextField>
                            {(errors.lastName && (!inputs.lastName || inputs.lastName.length < 2)) && <Typography variant='caption' color='red'>{errors.lastName}</Typography>}


                            <TextField variant='standard' value={inputs.email} name="email" onChange={handelChange}
                                required fullWidth autoComplete="off" label="Email"></TextField>
                            {(errors.email ) && <Typography variant='caption' color='red'>{errors.email}</Typography>}



                            
                            <TextField variant='standard' value={inputs.password} name="password" onChange={handelChange}
                                required fullWidth autoComplete="off" type='password' label="Password"></TextField>
                            {/* {errors.password  && <Typography variant='caption' color='red'> {errors.password}</Typography>} */}
                            {(errors.password || (!inputs.password)) && <Typography variant='caption' color='red'>{errors.password}</Typography>}


                            <TextField variant='standard' value={inputs.confirmPassword} name="confirmPassword" onChange={handelChange}
                                required fullWidth autoComplete="off" type='password' label="Confirm Password"></TextField>
                            {(errors.confirmPassword && (!inputs.confirmPassword || inputs.confirmPassword!==inputs.password)) && <Typography variant='caption' color='red'>{errors.confirmPassword}</Typography>}



                            <Button type='submit' variant='contained' sx={{m:2}}><AddCircleOutlineIcon color='white' sx={{mr:1}}/>Sign Up</Button>



                            <Box display='flex' textAlign='center' flexDirection='column'>
                                <Typography variant='body2' >Already have account ? <Link to='/signin' style={{ textDecoration: 'none',color:'#00A86B' }}>Login here</Link></Typography>
                            </Box>


                        </Box>
                    </form>
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



export default Signup;
import axios from 'axios';

const url='http://localhost:8080/signup'
// const url='https://techmeets-app.azurewebsites.net/signup'

console.log(url)

const Signup=async({firstName,lastName,email,password,confirmPassword})=>{    

    
    console.log(firstName,lastName,email,password,confirmPassword)
    let response=await axios.post(url,{firstName,lastName,email,password,confirmPassword})
        
        return response; 
    
}


export default Signup;


    






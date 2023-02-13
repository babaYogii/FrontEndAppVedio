import axios from 'axios';

// 'http://localhost:2002/register'
const url='https://vedioconferencingtechmeets.azurewebsites.net/signup'

console.log(url)

const Signup=async({firstName,lastName,email,password,contactNumber})=>{    

    try{
    console.log(firstName,lastName,email,password,contactNumber)
    let response=await axios.post(url,{firstName,lastName,email,password,contactNumber})
        
        return response; 
    }catch(error){
        return error;
    }
}


export default Signup;


    






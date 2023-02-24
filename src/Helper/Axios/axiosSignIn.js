import axios from 'axios';
const url= 'http://localhost:8080/signin'
// const url='https://techmeets-app.azurewebsites.net/signin'

console.log(url)

const axiosSignin=async({email,password})=>{  

    
   try{
       let response=await axios.post(url,{email,password}) 
       return response;
   }catch(error){
   console.log(error);
   }
  
    
    
}


export default axiosSignin;


    






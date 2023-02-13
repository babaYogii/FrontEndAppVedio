import axios from 'axios';
const url='https://vedioconferencingtechmeets.azurewebsites.net'


console.log(url)
let token=localStorage.getItem('token');

export const axiosCreateMeeting=async(meetingName)=>{  
    
    console.log(meetingName.scheduleDate)
    console.log(url+'/createMeeting')
    let user=localStorage.getItem('user');
    user=JSON.parse(user);
    
    try{
        console.log(token);
        let response=await axios.post(url+"/createmeeting",{user,...meetingName},{ headers: {"Authorization" : `Bearer ${token}`}})
        return response;
    }catch(error){
    console.log(error);
    }
    
    
}


export const axiosSignin=async({email,password})=>{  
    console.log(email)  
    let response=await axios.post(url+"/signin",{email,password})
        
        return response;
}



export const Signup=async({firstName,lastName,email,password,contactNumber})=>{    
    
    console.log(firstName,lastName,email,password,contactNumber)
    let response=await axios.post(url+"/signup",{firstName,lastName,email,password,contactNumber})
        return response; 
}



export const getMeetings=async()=>{
    let response=await axios.get(url+"/getMeetings",{ headers: {"Authorization" : `Bearer ${token}`}})
    return response;

} 


export const isUrlValid=async (meetingUrl)=>{
    console.log(meetingUrl)
  try{
    let response = await axios.post(url+'/joinRoom',{meetingUrl});
    if(response.status===200){
        return response;
    }
    
  }
  catch(error){
        return error;
  }
}


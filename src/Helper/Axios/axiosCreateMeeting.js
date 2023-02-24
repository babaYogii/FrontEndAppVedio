import axios from 'axios';
// const url='https://techmeets-app.azurewebsites.net'
const url='http://localhost:8080'

console.log(url)

export const axiosCreateMeeting=async(meetingName)=>{  
    
    // console.log(meetingName.imp)
    let payload={emails:meetingName.emails};
    console.log(meetingName.meetingDescription)
    console.log(url+'/createMeeting')
    let user=localStorage.getItem('user');
    user=JSON.parse(user);
    
        let token=localStorage.getItem('token');
        let response= await axios.post(url+"/createmeeting",{user,...meetingName,payload,"imp":meetingName.imp},{ headers: {"Authorization" : `Bearer ${token}`}})
        return response;
    
    
    
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
    let token=localStorage.getItem('token');
    let response=await axios.get(url+"/getMeetings",{ headers: {"Authorization" : `Bearer ${token}`}})
    return response;

} 


export const isUrlValid=async (meetingUrl)=>{
    console.log(meetingUrl)
    // https://techmeetsapp.azurewebsites.net/room/cdf77f70-03d0-4238-8a66-24a344c51cd3
  try{
    
    let response = await axios.post(url+'/joinRoom',{meetingUrl});
    if(response.status===200){
    //    console.log(response)
        return response;
    }
    
  }
  catch(error){
    // alert("invalid url")
    window.open('http://localhost:3000/invalidurl',"_self")
    console.log(error)
        return error;
  }
}




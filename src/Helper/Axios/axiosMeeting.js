

import axios from 'axios';
// const url='https://techmeets-app.azurewebsites.net'
const url='http://localhost:8080'




const token=localStorage.getItem('token')

export const deleteMeeting=async(meetingId)=>{
    try{
        let response = await axios.delete(url+`/deletemeeting/${meetingId}`,{ headers: {"Authorization" : `Bearer ${token}`}});
        if(response.status===200){
            
            return response;
        }
        
      }
      catch(error){
        alert("No meeting found")
            return error;
        
      }
}
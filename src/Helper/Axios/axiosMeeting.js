

import axios from 'axios';
const url='https://vedioconferencingtechmeets.azurewebsites.net'



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
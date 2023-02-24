import React from 'react'
import { Navigate, useLocation} from 'react-router-dom'
import { isUrlValid} from '../Helper/Axios/axiosCreateMeeting'
import { useNavigate } from 'react-router-dom';
import Room from './SafeRoom';

const SafeGaurd = () => {

const navigate=useNavigate();
const location=useLocation();
const [access,setAccess]=React.useState(false);


const meetingUrl=`http://localhost:3000${location.pathname}`


React.useEffect(() => {
    // Google Analytics
    async function get(){
   console.log('hello from safegaurd')
   try {
       let response= await isUrlValid(meetingUrl)
       console.log(response,"inside safeGaurd line 22") 
       if (response.status === 200 ) {
                setAccess(true);
            }
        } catch (error) {
            alert("Not a vlaid url");
            <Navigate to="/error"/>
            console.log(error.message)
        }
    }
    get();
    
    // localhost:3000/ROOM/e58e3c0b-1140-4f4d-9c14-4900a3516c42
    
}, [location,meetingUrl]);

// console.log(access)

  return (
    <div>
    
         {access ? <Room  /> :  <h1 style={{fontSize:'30px',marginTop:"100px"}}>Loading . . .</h1>}

    </div>
  )
}

export default SafeGaurd
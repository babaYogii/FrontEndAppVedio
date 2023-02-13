import React from 'react'
import { useLocation} from 'react-router-dom'
import { isUrlValid} from '../Helper/Axios/axiosCreateMeeting'
import Room from './SafeRoom';
import ErrorComponent from "./ErrorComponent";

const SafeGaurd = () => {

const location=useLocation();
const [access,setAccess]=React.useState(false);


const url=`localhost:3000${location.pathname}`

React.useEffect(() => {
    // Google Analytics
    async function get(){

        try {
            let response= await isUrlValid(url)
            if (response.status === 200) {
                setAccess(true);
                console.log(url,"inside safeGaurd line 22")   
            }
        } catch (error) {
            // alert(error);
            console.log(error)
        }
    }
    get();
    // localhost:3000/ROOM/e58e3c0b-1140-4f4d-9c14-4900a3516c42
    
}, [location,url]);

console.log(access)

  return (
    <div>
    
         {access ? <Room  />:  <ErrorComponent/>}

    </div>
  )
}

export default SafeGaurd
import React,{useEffect} from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";






const Room = (inputs) => {


  useEffect(() => {
   document.title="Safe Room - Tech Teams"
  
    
  }, [])
  


  const {meetingUrl } = useParams();

  const meeting = async (element) => {
    const appID = 946219318;
    const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingUrl,
      Date.now().toString(),
      "andrei"
    );
    
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks:[{
         name:'meetingUrl',
         url:`http://localhost:3000/room/${meetingUrl}`
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };
  
  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room;

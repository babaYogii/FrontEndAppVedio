import React,{useState} from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";



let user=localStorage.get('user')
user=json.parse();



const Room = (inputs) => {


  const {meetingUrl } = useParams();
  console.log(meetingUrl)

  const meeting = async (element) => {
    const appID = 908783553;
    const serverSecret = "61f0624ab42754d3d9d266337bf36a9e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingUrl,
      user.firstName,
      "andrei"
    );
    
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks:[{
         name:'meetingUrl',
         url:`${meetingUrl}`
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };
  
  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room;

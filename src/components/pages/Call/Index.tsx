import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import './Index.css'
import useWebRTC from '../../../Hooks/UseWebRTC/Index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faDesktop, faDesktopAlt, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { CallState } from '../../molecules/ChatHeader/Index';
const Call = () => {
    const location = useLocation();
    const state=location.state as CallState;
    const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const {isAudioMuted,isVideoMuted,setIsAudioMuted,setIsVideoMuted,localStreamVideoOnly,startScreenShare,isScreenSharing}=useWebRTC(true);
  useEffect(() => {
    if(localVideoRef.current)
        {
            localVideoRef.current.srcObject=localStreamVideoOnly;
        }
    return () => {
        if(localVideoRef.current)
            {
                localVideoRef.current.srcObject=null;
            }
      
    }
  }, [localStreamVideoOnly])
  
  return (
    <div className="call-page">
      <h1>{state.userName??"UD"}</h1>
      <div className="video-container">
        <video ref={remoteVideoRef} autoPlay className="remote-video" />
        <video ref={localVideoRef} autoPlay muted className="local-video" />
      </div>
      <div className="controls">
        <div className="control-button" onClick={()=>{setIsAudioMuted(!isAudioMuted)}}>
          <FontAwesomeIcon icon={isAudioMuted ? faMicrophoneSlash : faMicrophone} />
        </div>
        <div className="control-button" onClick={()=>{!isScreenSharing&&setIsVideoMuted(!isVideoMuted)}}>
          <FontAwesomeIcon icon={isVideoMuted ? faVideoSlash : faVideo} />
        </div>
        <div className={`control-button ${isScreenSharing ? 'active' : ''}`} onClick={()=>startScreenShare()}>
          <FontAwesomeIcon icon={ faDesktop} />
        </div>
      </div>
    </div>
  )
}

export default Call

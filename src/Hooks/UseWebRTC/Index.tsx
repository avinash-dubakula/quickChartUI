import { useState, useEffect, useRef, useContext } from 'react';
import { removeAudioFromStream, stopCamera, toggleAudio, toggleVideo } from './Logic';
import { HubConnection } from '@microsoft/signalr';
import { GetAccessToken } from '../../contexts/SignalRLogic';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { CreateConnection } from '../UseSignalR/Logic';
interface WebRTCState {
  localStreamVideoOnly: MediaStream | null;
  remoteStream: MediaStream | null;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isScreenSharing:boolean
  setIsAudioMuted: React.Dispatch<React.SetStateAction<boolean>>
  setIsVideoMuted: React.Dispatch<React.SetStateAction<boolean>>
  startScreenShare: () => Promise<void>
  startCall: () => void;
  endCall: () => void;
}
export interface Connections {
  [key: string]: RTCPeerConnection;
}
const useWebRTC = (isVideo: boolean): WebRTCState => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStreamVideoOnly, setlocalStreamVideoOnly] = useState<MediaStream | null>(null);
  const [webRTCHubConnection, setwebRTCHubConnection] = useState<HubConnection>();
  const {AuthData,dispatch}=useContext(AuthContext);
  const streamRef = useRef<MediaStream|null>(null); // Ref to hold the stream
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [Connections, setConnections] = useState<Connections>({});
  
 
  
  useEffect(() => {
    if(localStream!=null)
        {
          toggleAudio(localStream,!isAudioMuted);            
        }
  }, [isAudioMuted])
  useEffect(() => {

    if(localStream!=null)
        {
          if(!isScreenSharing)
            {
              toggleVideo(localStream,!isVideoMuted);
            }
         
        }
  }, [isVideoMuted])
  
  useEffect(() => {
    initializeMediaStream();
    return ()=>{
      stopCamera(streamRef);
    }
  }, [isScreenSharing]);
  const startScreenShare = async () => {
    if(isScreenSharing) return
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: isVideo, audio: true});
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        track.onended = () => {
          stopScreenShare();
        };
      });
      setIsScreenSharing(true);
      setIsVideoMuted(true); // Mute video when screen sharing starts

    } catch (err) {
      console.error('Error starting screen share', err);
    }
  };

  const stopScreenShare = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setIsScreenSharing(false);
    setIsVideoMuted(false); // Unmute video when screen sharing stops

  };

  const initializeMediaStream = async () => {
    if(isScreenSharing==false)
      {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: isVideo, audio: true });
          setLocalStream(stream);
          streamRef.current = stream;
        } catch (error) {
          console.error('Error accessing media devices:', error);
        }
      }
      else{
        startScreenShare()
      }
  };

  const startCall = () => {
    // Initialize peer connection and other WebRTC logic here
  };

  const endCall = () => {
    // End call logic
  };
  useEffect(() => {
    setlocalStreamVideoOnly(removeAudioFromStream(localStream))
  }, [localStream])
  
  return { localStreamVideoOnly, remoteStream, startCall, endCall,isAudioMuted,isVideoMuted,isScreenSharing,setIsAudioMuted,setIsVideoMuted,startScreenShare};
};

export default useWebRTC;

import { useState, useEffect } from 'react';
import { removeAudioFromStream, toggleAudio, toggleVideo } from './Logic';

interface WebRTCState {
  localStreamVideoOnly: MediaStream | null;
  remoteStream: MediaStream | null;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  setIsAudioMuted: React.Dispatch<React.SetStateAction<boolean>>
  setIsVideoMuted: React.Dispatch<React.SetStateAction<boolean>>
  startCall: () => void;
  endCall: () => void;
}

const useWebRTC = (isVideo: boolean): WebRTCState => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  useEffect(() => {
    if(localStream!=null)
        {
            toggleAudio(localStream,isAudioMuted);
            toggleVideo(localStream,isAudioMuted);
        }
  }, [isAudioMuted,isVideoMuted])
  
  useEffect(() => {
    initializeMediaStream();
  }, []);

  const initializeMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: isVideo, audio: true });
      setLocalStream(stream);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const startCall = () => {
    // Initialize peer connection and other WebRTC logic here
  };

  const endCall = () => {
    // End call logic
  };
  const localStreamVideoOnly=removeAudioFromStream(localStream)
  return { localStreamVideoOnly, remoteStream, startCall, endCall,isAudioMuted,isVideoMuted,setIsAudioMuted,setIsVideoMuted };
};

export default useWebRTC;

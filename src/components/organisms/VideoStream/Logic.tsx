export const attachMediaStream = (stream:MediaStream, videoRef: React.RefObject<HTMLVideoElement>) => {
  // Ensure srcObject is applied directly to the video element
  if (videoRef.current!=null && videoRef.current.srcObject !== stream) 
    {
    videoRef.current.srcObject = stream;
    console.log("Stream attached to", videoRef.current.id);
    }
};
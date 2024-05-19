// VideoStream.tsx
import React, { useRef, useEffect } from 'react';
import './Index.css'
interface VideoStreamProps {
  stream: MediaStream;
  isLocal?: boolean;
  enableControls?:boolean
  style?: React.CSSProperties;
  className?: string;
}

function VideoStream({ stream, isLocal = false,enableControls=true,style,className }: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="video-stream">
      <video style={style} className={`videoDefault ${className}`} ref={videoRef} autoPlay muted={isLocal} controls={enableControls} />
    </div>
  );
}

export default VideoStream;

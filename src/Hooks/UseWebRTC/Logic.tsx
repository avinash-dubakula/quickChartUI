export const removeAudioFromStream = (stream: MediaStream|null): MediaStream|null => {
    if(stream!=null)
        {
            const modifiedStream = new MediaStream();
            stream.getVideoTracks().forEach(track => modifiedStream.addTrack(track));
            return modifiedStream;
        }
    return null
  };
export const toggleAudio = (stream: MediaStream,enable:boolean): void => {
    stream.getAudioTracks().forEach(track => {
      track.enabled = enable // Toggle audio track enabled state
    });
  };
  
export const toggleVideo = (stream: MediaStream,enable:boolean): void => {
    stream.getVideoTracks().forEach(track => {
      track.enabled = enable
    });
  };
  
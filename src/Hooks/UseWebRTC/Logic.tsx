import { HubConnection } from "@microsoft/signalr";
import { Connections } from "./Index";
import { IAuthData } from "../../types/Authorization/ContextTypes";
import { GetMyUsername } from "../../contexts/AppDataLogic";
var peerConnectionConfig:RTCConfiguration = { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] };

type Signal = {
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
};
const errorHandler = (error: any) => {
  console.error('Error: ', error);
};

const sendHubSignal = (message: string, partnerClientId: string) => {
  // Implement the function to send the signal to the signaling server
};
export const closeConnection = (partnerClientId: string,connections:Connections): void => {
  console.log("WebRTC: called closeConnection");
  const connection = connections[partnerClientId];

  if (connection) {
      // Close the connection
      connection.close();
      delete connections[partnerClientId]; // Remove the property
      console.log(`WebRTC: connection with ${partnerClientId} closed and removed from connections`);
  } else {
      console.log(`WebRTC: no connection found for ${partnerClientId}`);
  }
};
export const closeAllConnections = (connections:Connections): void => {
  console.log("WebRTC: called closeAllConnections");
  for (const connectionId in connections) {
      if (connections.hasOwnProperty(connectionId)) {
          closeConnection(connectionId,connections);
      }
  }
};
export const getConnection = (partnerClientId: string,connections:Connections): RTCPeerConnection => {
  console.log("WebRTC: called getConnection");
  if (connections[partnerClientId]) {
      console.log("WebRTC: connection for partner client exists");
      return connections[partnerClientId];
  } else {
      console.log("WebRTC: initialize new connection");
      const newConnection = initializeConnection(partnerClientId,connections);
      connections[partnerClientId] = newConnection;
      return newConnection;
  }
};
const callbackIceCandidate = (evt: RTCPeerConnectionIceEvent, connection: RTCPeerConnection, partnerClientId: string): void => {
  console.log("WebRTC: Ice Candidate callback");
  if (evt.candidate) {
      // Found a new candidate
      console.log('WebRTC: new ICE candidate');
      sendHubSignal(JSON.stringify({ "candidate": evt.candidate }), partnerClientId);
  } else {
      // Null candidate means we are done collecting candidates.
      console.log('WebRTC: ICE candidate gathering complete');
      sendHubSignal(JSON.stringify({ "candidate": null }), partnerClientId);
  }
}
const callbackRemoveStream = (connection: RTCPeerConnection, evt: MediaStreamTrackEvent): void => {
  console.log('WebRTC: removing remote stream from partner window');
  // Clear out the partner window
  // const otherAudio = document.querySelector<HTMLAudioElement>('.audio.partner');
  // if (otherAudio) {
  //     otherAudio.srcObject = null;
  // }
};
const attachMediaStream = (stream: MediaStream, videoElementId: string): void => {
  // const videoElement = document.getElementById(videoElementId) as HTMLVideoElement;
  // if (videoElement && videoElement.srcObject !== stream) {
  //     videoElement.srcObject = stream;
  //     console.log("Stream attached to", videoElementId);
  // }
};

const callbackAddTrack = (connection: RTCPeerConnection, evt: RTCTrackEvent): void => {
  console.log('WebRTC: called callbackAddTrack');
  evt.streams.forEach((stream, index) => {
      console.log(`Stream ${index}:`, stream);
      stream.getTracks().forEach((track) => {
          console.log(`  Track kind: ${track.kind}, Track id: ${track.id}`);
      });
  });
  attachMediaStream(evt.streams[0], 'remoteVideo');  // Assuming the first stream contains the relevant media
};

export const initializeConnection = (partnerClientId: string,connections:Connections): RTCPeerConnection => {
  console.log('WebRTC: Initializing connection...');
  const connection: RTCPeerConnection = new RTCPeerConnection(peerConnectionConfig);
  connection.onicecandidate = (evt: RTCPeerConnectionIceEvent) => callbackIceCandidate(evt, connection, partnerClientId);
  connection.ontrack = (evt: RTCTrackEvent) => {
    if (evt.track.kind === 'audio' || evt.track.kind === 'video') {
        // When a track is added
        evt.track.onended = () => {
            // Code to handle the removal of the track
            console.log('Track ended, which could mean stream removal:', evt.track);
            callbackRemoveStream(connection, evt);
        };
        // Additional handling for added tracks
        console.log('Track added:', evt.track);
        callbackAddTrack(connection, evt);
    }
};
  connections[partnerClientId] = connection; // Store the connection based on partnerClientId
  return connection;
};
export const newSignal = (partnerClientId: string, data: string,connections:Connections,localStream:MediaStream) => {
  console.log('WebRTC: called newSignal');

  const signal: Signal = JSON.parse(data);
  const connection = getConnection(partnerClientId,connections);
  console.log("connection: ", connection);

  if (signal.sdp) {
      console.log('WebRTC: sdp signal');
      receivedSdpSignal(connection, partnerClientId, signal.sdp,localStream);
  } else if (signal.candidate) {
      console.log('WebRTC: candidate signal');
      receivedCandidateSignal(connection, partnerClientId, signal.candidate);
  } else {
      console.log('WebRTC: adding null candidate');
      connection.addIceCandidate(undefined).then(
          () => console.log("WebRTC: added null candidate successfully"),
          () => console.log("WebRTC: cannot add null candidate")
      );
  }
};

export const receivedCandidateSignal = (
  connection: RTCPeerConnection, 
  partnerClientId: string, 
  candidate: RTCIceCandidateInit | null,
) => {
  console.log('WebRTC: adding full candidate');
  if (candidate) {
      connection.addIceCandidate(new RTCIceCandidate(candidate)).then(
          () => console.log("WebRTC: added candidate successfully"),
          () => console.log("WebRTC: cannot add candidate")
      );
  } else {
      console.log("WebRTC: received null candidate, ignoring.");
  }
};

export const receivedSdpSignal = (
  connection: RTCPeerConnection, 
  partnerClientId: string, 
  sdp: RTCSessionDescriptionInit,
  localStream:MediaStream
) => {
  console.log('connection: ', connection);
  console.log('sdp', sdp);
  console.log('WebRTC: called receivedSdpSignal');
  console.log('WebRTC: processing sdp signal');

  connection.setRemoteDescription(new RTCSessionDescription(sdp)).then(() => {
      console.log('WebRTC: set Remote Description');
      if (connection.remoteDescription && connection.remoteDescription.type === "offer") {
          console.log('WebRTC: remote Description type offer');
          localStream.getTracks().forEach(track => connection.addTrack(track, localStream));
          console.log('WebRTC: added tracks');
          connection.createAnswer().then((desc) => {
              console.log('WebRTC: create Answer...');
              connection.setLocalDescription(desc).then(() => {
                  console.log('WebRTC: set Local Description...');
                  console.log('connection.localDescription: ', connection.localDescription);
                  sendHubSignal(JSON.stringify({ "sdp": connection.localDescription }), partnerClientId);
              }, errorHandler);
          }, errorHandler);
      } else if (connection.remoteDescription && connection.remoteDescription.type === "answer") {
          console.log('WebRTC: remote Description type answer');
      }
  }, errorHandler);
};

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
export const OnReadyForStream = ( connection:RTCPeerConnection,localStream:MediaStream ) => { 
      console.log("WebRTC: called onReadyForStream");
      // The connection manager needs our stream
      //console.log("onReadyForStream connection: ", connection);
      localStream.getTracks().forEach(track => {
        connection.addTrack(track, localStream);
    });
      console.log("WebRTC: added stream");
  return null;
};
export const onStreamRemoved = (connection:RTCPeerConnection, streamId:string) => {
  console.log("WebRTC: onStreamRemoved -> Removing stream: ");
  //console.log("Stream: ", streamId);
  //console.log("connection: ", connection);
}
export const initiateOffer = (partnerClientId: string, localStream: MediaStream,connections:Connections): void => {
  console.log('WebRTC: called initiateOffer: ');
  const connection = getConnection(partnerClientId,connections); // Get a connection for the given partner
  console.log('initiate Offer stream: ', localStream);
  console.log("offer connection: ", connection);
  // Add each track from the stream to the connection
  localStream.getTracks().forEach(track => {
      connection.addTrack(track, localStream);
  });
  console.log("WebRTC: Added local stream");
  connection.createOffer().then(offer => {
      console.log('WebRTC: created Offer: ');
      console.log('WebRTC: Description after offer: ', offer);

      connection.setLocalDescription(offer).then(() => {
          console.log('WebRTC: set Local Description: ');
          console.log('connection before sending offer ', connection);

          setTimeout(() => {
              sendHubSignal(JSON.stringify({ "sdp": connection.localDescription }), partnerClientId);
          }, 1000);
      }).catch(err => console.error('WebRTC: Error while setting local description', err));
  }).catch(err => console.error('WebRTC: Error while creating offer', err));
}
export const stopCamera = (streamRef: React.MutableRefObject<MediaStream | null>) => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }
};

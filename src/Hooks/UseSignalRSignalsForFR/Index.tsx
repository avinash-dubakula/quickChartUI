import { HubConnection } from "@microsoft/signalr";
import { useContext, useEffect } from "react";
import { AppDataContext } from "../../contexts/AppDataContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { GetAccessToken } from "../../contexts/SignalRLogic";
import { subscribeToNewFRequest } from "./Logic";
import { FriendshipContext } from "../../contexts/FriendShipContextProvider";

const UseSignalRSignalsForFR = (hubConnection: HubConnection | undefined, isStart: boolean) => {
    const {Data:friendshipData,dispatch:friendshipDispatch}=useContext(FriendshipContext);
    const {AuthData:authData}=useContext(AuthContext)
    useEffect(() => { 
        if (hubConnection && isStart && friendshipData) { 
            subscribeToNewFRequest(hubConnection,friendshipDispatch);              
        } 
        // Cleanup function that will be called when the component unmounts
        return () => { 
          if (hubConnection && isStart && friendshipData) { 
            // Remove the 'ReceiveMessage' event listener when the component unmounts 
            hubConnection.off('NewFriendRequest');  
            console.log('Listener removed'); 
          } 
        }; 
      }, [hubConnection,isStart]); 
      // Make sure the effect runs again if hubConnection changes 
}

export default UseSignalRSignalsForFR
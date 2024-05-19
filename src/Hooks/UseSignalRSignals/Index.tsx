import { Data } from 'emoji-mart';
import React, { useContext, useEffect } from 'react'
import { GetAccessToken } from '../../contexts/SignalRLogic';
import { subscribeToNewMessage, subscribeToMessageUpdate, subscribeToMessagesUpdate } from './Logic';
import { AppDataContext } from '../../contexts/AppDataContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { HubConnection } from '@microsoft/signalr';

const UseSignalRSignals = (hubConnection: HubConnection | undefined, isStart: boolean) => {
    const {Data:appData,dispatch:appDispatch}=useContext(AppDataContext);
    const {AuthData:authData}=useContext(AuthContext)
    useEffect(() => { 
        if (hubConnection && isStart && appData) { 
            var token=GetAccessToken(authData.userAuthenticationData);
            subscribeToNewMessage(hubConnection,appDispatch,appData,token); 
            subscribeToMessageUpdate(hubConnection,appDispatch);
            subscribeToMessagesUpdate(hubConnection,appDispatch);         
        } 
        // Cleanup function that will be called when the component unmounts
        return () => { 
          if (hubConnection && isStart && appData) { 
            // Remove the 'ReceiveMessage' event listener when the component unmounts 
            hubConnection.off('RecieveMessage'); 
            hubConnection.off('MessageUpdated');
            hubConnection.off('MessagesUpdated');          
            console.log('Listener removed'); 
          } 
        }; 
      }, [hubConnection,appData.activeChatUserName,isStart,appData]); 
      // Make sure the effect runs again if hubConnection changes 
}

export default UseSignalRSignals

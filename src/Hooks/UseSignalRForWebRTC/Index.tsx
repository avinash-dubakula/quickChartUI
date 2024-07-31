import { useContext, useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { GetActiveChatUserName, GetFriendUserNames } from '../../contexts/AppDataLogic';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AppDataContext } from '../../contexts/AppDataContextProvider';
import { ISignalRForWebRTC } from '../../types/SignalR/EntityTypes';
import { GetAccessToken } from '../../contexts/SignalRLogic';
import { startWebRTCConnection } from './Logic'
import { CreateConnection, startConnection } from '../UseSignalR/Logic';
import UseSignalRSignalsForFR from '../UseSignalRSignalsForFR/Index';

export const UseSignalRForWebRTC = (hubUrl: string): ISignalRForWebRTC => {
    const {Data,dispatch:appDispatch}=useContext(AppDataContext);
    const {AuthData}=useContext(AuthContext);
    const [hubConnection, setHubConnection] = useState<HubConnection>();
    const [isAcknowledgementSent,setisAcknowledgementSent]=useState(false);
    const [isStart, setisStart] = useState(false)
    UseSignalRSignalsForFR(hubConnection,isStart);
    const StartSignalRForWebRTC=()=>{
        setisStart(true)
     }
    useEffect(() => {
        console.log('signal r For WebRTC use Effect')        
        if(GetAccessToken(AuthData.userAuthenticationData)!=null && GetAccessToken(AuthData.userAuthenticationData).length>0 && isStart)
        {        
            var connection= CreateConnection(hubUrl);
            setHubConnection(connection);
            startWebRTCConnection(connection,setisAcknowledgementSent,AuthData);
            return () => {
            
                connection?.stop().then(() => console.log('Connection stopped'));
            
        };
        
    }
    }, [hubUrl,AuthData,isStart]);
    if(Data!=null)
    console.log('Signal R For WebRTC',GetActiveChatUserName(Data));
    
    

    return {hubConnection,isAcknowledgementSent,isCallHubStart:isStart,StartCallHubConnection:StartSignalRForWebRTC};
};

import { useContext, useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { GetActiveChatUserName, GetFriendUserNames } from '../../contexts/AppDataLogic';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AppDataContext } from '../../contexts/AppDataContextProvider';
import UseOnlineTracker from '../UseOnlineTracker/Index';
import { ISignalRReturn } from '../../types/SignalR/EntityTypes';
import { GetAccessToken } from '../../contexts/SignalRLogic';
import { CreateConnection, startConnection } from './Logic';
import UseSignalRSignals from '../UseSignalRSignals/Index';
import { createConnection } from 'net';
export const useSignalR = (hubUrl: string): ISignalRReturn => {
    const {Data,dispatch:appDispatch}=useContext(AppDataContext);
    const {AuthData}=useContext(AuthContext);
    const [hubConnection, setHubConnection] = useState<HubConnection>();
    const [isStart, setisStart] = useState(false)
    const [isAcknowledgementSent,setisAcknowledgementSent]=useState(false);
    const StartSignalR=()=>{
       setisStart(true)
    }
    UseOnlineTracker(hubConnection,isStart,isAcknowledgementSent);
    UseSignalRSignals(hubConnection,isStart);
    useEffect(() => {
        console.log('signal r use Effect')        
        if(GetAccessToken(AuthData.userAuthenticationData)!=undefined && GetAccessToken(AuthData.userAuthenticationData).length>0  && isStart)
        {        
            var connection= CreateConnection(hubUrl);
            setHubConnection(connection);
            startConnection(connection,setisAcknowledgementSent,AuthData);
            return () => {
            
                connection?.stop().then(() => console.log('Connection stopped'));
            
        };
        
    }
    }, [hubUrl,AuthData,isStart]);
    if(Data!=null)
    console.log('Signal R',GetActiveChatUserName(Data));
    
    

    return {hubConnection,StartConnection: StartSignalR,isStart};
};

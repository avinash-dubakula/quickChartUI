import React, { useContext, useEffect } from 'react'
import { SignalRContext } from '../../contexts/SignalRContextProvider';
import { InitialSignalRActionType } from '../../types/SignalR/ContextTypes';
import { HubConnection } from '@microsoft/signalr';

const UseOnlineTracker = (hubConnection:HubConnection|undefined,isStart: boolean,isAcknowledgementSent: boolean) => {
    const {Data:signalRData,dispatch:signalRDispatch}=useContext(SignalRContext);
    var userfriends:string[]=signalRData.frienduserNames??[]
    var userfriendDepependency=userfriends.join(',');
    useEffect(() => {
        const userConnectedHandle=(userName:string)=>
          {
            console.warn(`user ${userName} connected`);
            signalRDispatch({...InitialSignalRActionType,type:"UserOnline",string:userName});
  
          }
        const userDisconnectedHandle=(userName:string)=>{
            console.warn(`user ${userName} DisConnected`)
            signalRDispatch({...InitialSignalRActionType,type:"UserOffline",string:userName});
        }
        const subscibeToUserConnected=(connection:signalR.HubConnection)=>{
            connection.on("userConnected",userConnectedHandle)
        }
        const subscibeToUserDiscConnected=(connection:signalR.HubConnection)=>{
            connection.on("userDisConnected",userDisconnectedHandle)
        }
        if (hubConnection && isStart && isAcknowledgementSent) { 
            subscibeToUserConnected(hubConnection);
            subscibeToUserDiscConnected(hubConnection);
            console.log('Added Listeners for OnlineTracker')
        }
    
      return () => {
          if (hubConnection && isStart && isAcknowledgementSent) { 
              hubConnection.off('userDisConnected');
              hubConnection.off('userConnected');
              console.log('Removed Listeners for OnlineTracker')
          }
      }
    }, [hubConnection,isStart,isAcknowledgementSent])
    useEffect(() => {
        //Initial Active Friends Fetching
        var fetchedActiveUserNames:string[]=[];
        if(userfriends.length>0 && hubConnection && isStart==true && isAcknowledgementSent==true)
            { 
                setTimeout(async ()=>{
                    //make api call
                    console.log('my friends',userfriends,new Date().toLocaleTimeString())
                    fetchedActiveUserNames=await hubConnection.invoke<string[]>("GetActiveUserNames",userfriends);
                    console.log('Active',fetchedActiveUserNames,new Date().toLocaleTimeString());
                    signalRDispatch({...InitialSignalRActionType,type:"SetActiveFriends",stringList:fetchedActiveUserNames});
                },1000)
            }            
        return () => {         
        }
      }, [userfriendDepependency,hubConnection,isStart,isAcknowledgementSent])
    
}

export default UseOnlineTracker

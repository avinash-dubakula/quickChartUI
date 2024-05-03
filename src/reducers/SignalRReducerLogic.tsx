import { ISignalRData } from "../types/SignalR/ContextTypes";
export const UserConnectedAction=(oldState:ISignalRData, userName:string):ISignalRData=>{
    if(oldState.activeUserNames!=null && !oldState.activeUserNames.includes(userName))
      {
        var newState={...oldState};
        newState.activeUserNames=[...oldState.activeUserNames,userName];
        return newState
      }
    return oldState;
  }
  export const UserDisConnectedAction=(oldState:ISignalRData, userName:string):ISignalRData=>{
    if(oldState.activeUserNames!=null && oldState.activeUserNames.includes(userName))
      {
        var newState={...oldState};
        newState.activeUserNames=oldState.activeUserNames.filter(name=>name!=userName);
        return newState
      }
    return oldState;
  }
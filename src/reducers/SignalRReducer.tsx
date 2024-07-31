import { ISignalRData, InitialSignalRData, SignalRActionType } from "../types/SignalR/ContextTypes";
import { UserConnectedAction, UserDisConnectedAction } from "./SignalRReducerLogic";

const SignalRReducer = (oldState:ISignalRData,action:SignalRActionType):ISignalRData => {
    if(action.type!=null)
    {
      switch(action.type)
      {
            case 'SetFriends':
              var users= action.stringList;
              return {...oldState,frienduserNames:users}
            case 'SetActiveFriends':
                var activeUsers= action.stringList;
                return {...oldState,activeUserNames:activeUsers} 
            case 'UserOnline':
                var username=action.string;
                if(username)
                    {
                        var result=UserConnectedAction(oldState,username);
                        return result;
                    }
                return oldState
            case 'UserOffline':
                var username=action.string;
                if(username)
                    {
                        var result=UserDisConnectedAction(oldState,username);
                        return result;
                    }
                return oldState
            case 'LOGOUT':
                return InitialSignalRData
            default:
                return oldState
  
      }
    }
    return oldState;
  }
  
  
  export default SignalRReducer
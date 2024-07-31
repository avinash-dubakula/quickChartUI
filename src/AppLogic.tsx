import { FecthChats } from "./api/Chats/Index"
import FetchFriendRequests from "./api/Friends/FetchFriendRequest";
import FetchFriends from "./api/Friends/FetchFriends";
import { GetFriendUserNames } from "./contexts/AppDataLogic";
import { AppDataActionType, IChats, InitialAppDataActionType } from "./types/AppData/Context/Types";
import { IFriendshipActionType, InitialFriendshipActionType } from "./types/Friends/ContextTypes";
import { FriendRequestData, IFriendData } from "./types/Friends/EntityTypes";
import { InitialSignalRActionType, SignalRActionType } from "./types/SignalR/ContextTypes";

export const InitalLoadChats =async (bearerToken: string,isSpam:boolean,minimumMessagesRequested:number,dispatch:React.Dispatch<AppDataActionType>,signalRdispatch: React.Dispatch<SignalRActionType>):Promise<boolean> => {
  var chats= await FecthChats<IChats>(bearerToken,isSpam,minimumMessagesRequested);
  var frienduserNames=GetFriendUserNames(chats);
  console.log('AppLogic',chats);
  if(chats!=null)
    {
      if(frienduserNames.length>0)
        {
          signalRdispatch({...InitialSignalRActionType,type:"SetFriends",stringList:frienduserNames})
        }
        dispatch({...InitialAppDataActionType,type:"LoadInitialChats",initialChatData:chats})
        console.log('successfully set initial chats');
        return true;
    }
    return false;
}
export const InitalLoadFriendRequests =async (bearerToken: string,dispatch:React.Dispatch<IFriendshipActionType>):Promise<boolean> => {
  var friends=await FetchFriends<IFriendData>(bearerToken);
  var requests=await FetchFriendRequests<FriendRequestData>(bearerToken);
  
  if(friends!=null && requests!=null)
    {    
      dispatch({...InitialFriendshipActionType,type:"SetFriendsAndRequests",friendRequests:requests,friends:friends})
      console.log('successfully set initial friends and Requests');
      return true;
    }
    return false;
}

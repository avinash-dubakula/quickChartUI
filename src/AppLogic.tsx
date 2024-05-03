import { FecthChats } from "./api/Chats/Index"
import { GetFriendUserNames } from "./contexts/AppDataLogic";
import { AppDataActionType, IChats, InitialAppDataActionType } from "./types/AppData/Context/Types";
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

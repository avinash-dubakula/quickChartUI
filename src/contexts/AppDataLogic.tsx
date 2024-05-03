import React from 'react'
import { IAppData, IChatData, IChats } from '../types/AppData/Context/Types'
import { IChat } from '../types/AppData/Message/Types'
import { IAuthData } from '../types/Authorization/ContextTypes'

export const GetChats =(chats:IChats):IChat[] | null => {
  var temp1=chats.chatData
  if(temp1!=null)
    {
        var result=temp1.map(item=>item.chat).sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());
        return result;
    };
    return null
}
export const GetChat =(chats:IChats,userName:string):IChatData | null => {
    var temp1=chats.chatData
    if(temp1!=null)
      {
          var result=temp1.find(item=>item.chat.friendUserName==userName);
          if(result!=undefined)
            {
                return result;
            }
      };
      return null
  }
export const GetActiveChatUserName=(AppData:IAppData):string|null=>{
  var userName=AppData.activeChatUserName;
  return userName;
}
export const GetFriendUserNames=(chats:IChats|null):string[]=>{
  var userNames:string[]=[];
  if(chats!=null && chats.chatData)
    {
        userNames=chats.chatData.map(element => element.chat.friendUserName).sort();
    }  
  return userNames;
}
export const IsValueEquals=(list1: string[], list2: string[]): boolean =>{
  return list1.length === list2.length && list1.every((value) => list2.includes(value));
}
export const GetMyUsername=(AuthData:IAuthData):string |undefined=>{
  var result=AuthData.userAuthenticationData?.userName;
  return result;
}
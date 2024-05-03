import React from 'react'
import { IAppData, AppDataActionType, IChatData, InitialAppdata } from '../types/AppData/Context/Types';
import { DeliveryStatusSentAction, MessagesUpdateAction, RecieveMessageAction, RecieveMessageUpdateAction, SentMessageAction } from './AppDataReducerLogic';
import { IsValueEquals } from '../contexts/AppDataLogic';

const AppDataReducer = (oldState:IAppData,action:AppDataActionType):IAppData => {
  console.log('App Data Reducer',action.type)
  if(action.type!=null)
  {
    switch(action.type)
    {
        
        case "LoadInitialChats":
          if(action.initialChatData!=null)
            {
              return {...oldState,chats:action.initialChatData}
            }
          return oldState
        case "SetActiveChat":
          if(action.currentChatUserName!=null && oldState.activeChatUserName!=action.currentChatUserName)
            {
              //Start the messageId Flush
              var newState={...oldState}
              if(newState.chats!=null)
                {
                  var chatTobeUpdated=newState.chats.chatData.find(chat=>chat.chat.friendUserName==oldState.activeChatUserName);
                  if(chatTobeUpdated!=undefined)
                    {
                      chatTobeUpdated.newMessageIds=[]
                      return{...newState,activeChatUserName:action.currentChatUserName};
                    }
                }
              
              return {...oldState,activeChatUserName:action.currentChatUserName}
            }
          return oldState
        case "SentMessage":
            if(action.messageResponse!=null )
              {
                var resultState=SentMessageAction(action.messageResponse,oldState);
                return resultState;       
              }
            return oldState
        case "RecievedMessage":
          if(action.messageResponse!=null )
            {
              var resultState=RecieveMessageAction(action.messageResponse,oldState);
              return resultState;       
            }
          return oldState
        case "RecievedMessageUpdate":
          if(action.messageResponse!=null )
            {
              var resultState=RecieveMessageUpdateAction(action.messageResponse,oldState);
              return resultState;       
            }
          return oldState
        case "RecievedMessagesUpdate":
          if(action.messagesUpdate!=null)
            {
                var resultState=MessagesUpdateAction(action.messagesUpdate,oldState);
                return resultState
            }
            return oldState
        case "DeliveryStatusSent":
          var resultState=DeliveryStatusSentAction(oldState);
          return resultState
        case "LOGOUT":
          return {...InitialAppdata}
        default:
            return oldState

    }
  }
  return oldState;
}

export default AppDataReducer

import React from 'react'
import { IAppData } from '../types/AppData/Context/Types'
import { IMessageResponse, IMessageBatch, IMessagesUpdateModel, MessageStatus } from '../types/AppData/Message/Types'
export const SentMessageAction = (messageResponse: IMessageResponse, oldState: IAppData):IAppData => {
  if (oldState.chats != null && oldState.chats.chatData != null) {
    var currentChatindex = oldState.chats.chatData.findIndex(item => item.chat.friendUserName == messageResponse.friendUserName);
    console.log('chat found', currentChatindex);
    if (currentChatindex != -1) {
      var currentChat = { ...oldState.chats.chatData[currentChatindex] };
      // currentChat.chat.lastMessageDate = messageResponse.message.actionAt;
      // currentChat.chat.lastMessage = messageResponse.message.message;
      var currentMessageBatchIndex = currentChat.messageBatches.findIndex(item => item.batchDate == messageResponse.batchDate);
      if (currentMessageBatchIndex != -1) {
        //belong to a existing batch
        currentChat.messageBatches[currentMessageBatchIndex].messages = [...currentChat.messageBatches[currentMessageBatchIndex].messages, messageResponse.message];
      }
      else {
        //does not belong to a existing batch
        var newBatch: IMessageBatch = {
          batchDate: messageResponse.batchDate,
          messages: [messageResponse.message]
        };
        currentChat.messageBatches = [...currentChat.messageBatches, newBatch];
      }
      var newState = { ...oldState };
      if (newState.chats != null && newState.chats.chatData != null) {
        console.log('new State');
        currentChat.chat.lastMessageDate = messageResponse.message.actionAt;
        if(messageResponse.message.id>currentChat.chat.lastMessageId)
          {
            currentChat.chat.lastMessageId=messageResponse.message.id
          }
        currentChat.chat.lastMessage = messageResponse.message.message;
        newState.chats.chatData[currentChatindex] = currentChat;
        return newState;
      }

    }
  }
  return oldState;

};
export const RecieveMessageAction = (messageResponse: IMessageResponse, oldState: IAppData):IAppData => {
  if (oldState.chats != null && oldState.chats.chatData != null) {
    var currentChatindex = oldState.chats.chatData.findIndex(item => item.chat.friendUserName == messageResponse.friendUserName);
    console.log('chat found', currentChatindex);
    if (currentChatindex != -1) {
      var currentChat = { ...oldState.chats.chatData[currentChatindex] };
      currentChat.newMessageIds=[...currentChat.newMessageIds,messageResponse.message.id]
      var currentMessageBatchIndex = currentChat.messageBatches.findIndex(item => item.batchDate == messageResponse.batchDate);
      if (currentMessageBatchIndex != -1) {
        //belong to a existing batch
        currentChat.messageBatches[currentMessageBatchIndex].messages = [...currentChat.messageBatches[currentMessageBatchIndex].messages, messageResponse.message];
      }
      else {
        //does not belong to a existing batch
        var newBatch: IMessageBatch = {
          batchDate: messageResponse.batchDate,
          messages: [messageResponse.message]
        };
        currentChat.messageBatches = [...currentChat.messageBatches, newBatch];
      }
      var newState = { ...oldState };
      if (newState.chats != null && newState.chats.chatData != null) {
        console.log('new State');
        currentChat.chat.lastMessage=messageResponse.message.message;
        currentChat.chat.lastMessageDate=messageResponse.message.actionAt;
        if(messageResponse.message.id>currentChat.chat.lastMessageId)
          {
            currentChat.chat.lastMessageId=messageResponse.message.id
          }
        newState.chats.chatData[currentChatindex] = currentChat;
        
        return newState;
      }

    }
  }
  return oldState;

};
export const RecieveMessageUpdateAction = (messageResponse: IMessageResponse, oldState: IAppData):IAppData => {
  if (oldState.chats != null && oldState.chats.chatData != null) {
    var currentChatindex = oldState.chats.chatData.findIndex(item => item.chat.friendUserName == messageResponse.friendUserName);
    console.log('chat found', currentChatindex);
    if (currentChatindex != -1) {
      var currentChat = { ...oldState.chats.chatData[currentChatindex] };
      var currentMessageBatchIndex = currentChat.messageBatches.findIndex(item => item.batchDate == messageResponse.batchDate);
      console.log('currentMessageBatchIndex',currentMessageBatchIndex,messageResponse)
      if (currentMessageBatchIndex != -1) {
        //belong to a existing branch
        var messageIndex=currentChat.messageBatches[currentMessageBatchIndex].messages.findIndex(msg=>msg.id==messageResponse.message.id)
        if(messageIndex!=-1)
          {
            console.log('Message Delivered')
            currentChat.messageBatches[currentMessageBatchIndex].messages[messageIndex]=messageResponse.message;
          }
          else{
            return oldState;
          }
      }
      var newState = { ...oldState };
      if (newState.chats != null && newState.chats.chatData != null) {
        console.log('new State');
        newState.chats.chatData[currentChatindex] = currentChat;
        return newState;
      }

    }
  }
  return oldState;

};
export const DeliveryStatusSentAction=(oldState: IAppData):IAppData=>{
  if(oldState.chats!=null && oldState.chats.dataFetchedTime!=null)
    {
      var temp=oldState.chats.dataFetchedTime;
      var newState={...oldState}
      newState.deliveryStatusSent=temp;
      return newState;
    }
  return oldState;
}
export const MessagesUpdateAction = (messageModal: IMessagesUpdateModel, oldState: IAppData):IAppData => {
  var chatIndexTobeUpdated=oldState.chats?.chatData?.findIndex(chat=>chat.chat.friendUserName==messageModal.friendUserName)
  if(chatIndexTobeUpdated!=undefined && chatIndexTobeUpdated!=-1)
    {
      var chatTobeUpdated=oldState.chats?.chatData[chatIndexTobeUpdated];
      if(chatTobeUpdated!=undefined)
        {
          var isUpdateRequired:boolean=false;
          chatTobeUpdated.messageBatches
          .forEach(msgBatch=>msgBatch.messages
            .forEach(msg=>
            {
              if(!msg.isIncoming && msg.messageStatus==MessageStatus.Sent && messageModal.newStatus==MessageStatus.Delivered && new Date(msg.actionAt)<=messageModal.dbFetchedTime)
                {
                  msg.messageStatus=MessageStatus.Delivered;
                  isUpdateRequired=true
                }
                else if(!msg.isIncoming && msg.messageStatus==MessageStatus.Delivered || msg.messageStatus==MessageStatus.Sent)
                  {
                    msg.messageStatus=MessageStatus.Delivered;
                    isUpdateRequired=true;
                  }
            }
          ))
          var newState={...oldState};
          if(isUpdateRequired && newState.chats!=null)
            {  
              console.warn('Updating chats',messageModal);
              newState.chats.chatData[chatIndexTobeUpdated]=chatTobeUpdated;
              return newState;
            }
        }
    }
    return oldState
};
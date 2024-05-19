import React, { useContext, useEffect, useRef, useState } from 'react'
import './Index.css'
import { IChat, IMessageBatch, IMessageData, IMessageResponse, IMessagesSeenModel, MessageStatus } from '../../../../types/AppData/Message/Types';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AppDataContext } from '../../../../contexts/AppDataContextProvider';
import { AuthContext } from '../../../../contexts/AuthContextProvider';
import {GetChat } from '../../../../contexts/AppDataLogic';
import { SendMessage, addEmoji, closeChatHandler, deleteChatHandler, formatDate, handleClickOutside, handleKeyDown, onScroll, scrollToBottom } from './Logic';
import MessageList from '../../../molecules/MessageList/Index';
import ChatHeader from '../../../molecules/ChatHeader/Index';
import { IChatData, InitialAppDataActionType } from '../../../../types/AppData/Context/Types';
import { SignalRContext } from '../../../../contexts/SignalRContextProvider';
import PutSeenAck from '../../../../api/Chat/PutSeenAck';
const Chat: React.FC = () => {
  console.log('Inside Chat Component')
  const {Data:AppData,dispatch:appDispatch} = useContext(AppDataContext);
  const [seenAckId, setSeenAckId] = useState<number>(-1);
  const {AuthData}=useContext(AuthContext);
  const {Data:signalRData}=useContext(SignalRContext);
  const [message, setMessage] = useState<string>('');
  const [sending, setsending] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  var userMessages:IMessageBatch[]| null=null;
  var isUserActive:boolean=false;
  var userChat:IChat|null=null;
  var newMessageStart:number|null=null
  const sendSeenAck=async (latestMId:number)=>{   
    if(chat!=null && AuthData.userAuthenticationData!=null && AppData.activeChatUserName!=null && AuthData.userAuthenticationData.userName!=AppData.activeChatUserName)
      {
        console.warn(`In UseEffect ${latestMId} ${chat.seenTillMessageId} ${seenAckId}`)
        var latestMessageId=chat.chat.lastMessageId
        if((chat.seenTillMessageId==null || chat.seenTillMessageId<latestMessageId) && seenAckId!=latestMessageId)
          {
    
            var seenModel:IMessagesSeenModel={FriendUserName:AppData.activeChatUserName,SeenTillMessageId:latestMessageId}
            var res=await PutSeenAck<Boolean>(AuthData.userAuthenticationData.token,seenModel);  
            if(res==true)
              {
                setSeenAckId(latestMessageId);
                appDispatch({...InitialAppDataActionType,type:"SentSeenAck",currentChatUserName:AppData.activeChatUserName,seenAckId:latestMessageId})
              }
          }
      }
  }
  
  var chat:IChatData | null=null;
  if(AppData.chats!=null && AppData.activeChatUserName!=null)
    {
      chat=GetChat(AppData.chats,AppData.activeChatUserName);
      if(chat!=null)
        {
          
          userMessages=chat.messageBatches;
          userChat=chat.chat;
          var n=chat.newMessageIds.length;
          if(n>0)
            {
              newMessageStart=chat.newMessageIds[0]
            }
          if(signalRData.activeUserNames!=null)
            {
              isUserActive=signalRData.activeUserNames.includes(userChat.friendUserName);
            }
        }
    }
  var latestMId:number=-1
  if(userChat!=undefined)
    {
     latestMId=userChat?.lastMessageId
    }
  useEffect(() => {
    
    if(chat!=undefined && latestMId!=-1)
      {
        sendSeenAck(latestMId);
      }
    
  }, [latestMId])
    const SendMessageAddParam=(): void=> {
      SendMessage(userChat,AuthData,AppData,sending,message,setsending,setMessage,appDispatch);
    }
    const toggleMenuVisibility = () => {
      setIsMenuVisible(!isMenuVisible);
    };
    const toggleEmojiPicker = () => {
      setIsPickerVisible(!isPickerVisible);
    };
  const onOutsideClick = (event: MouseEvent) => {
    handleClickOutside(event, emojiPickerRef, toggleButtonRef, setIsPickerVisible);
  };
  useEffect(() => {
    // Adding event listeners
    document.addEventListener('mousedown', onOutsideClick);
    chatContainerRef.current?.addEventListener('scroll', e=>onScroll(chatContainerRef,setShowScrollIcon));
  
    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      chatContainerRef.current?.removeEventListener('scroll', e=>onScroll(chatContainerRef,setShowScrollIcon));
    };
  }, []); // Depend on refs to re-bind events if they change
  useEffect(() => {
    scrollToBottom(chatContainerRef) 
  },[AppData?.activeChatUserName,userChat?.lastMessage])
  
  return (
    <div className='chat-container'>
      <ChatHeader appDispatch={appDispatch} isMenuVisible={isMenuVisible} userChat={userChat} toggleMenuVisibility={toggleMenuVisibility} isActive={isUserActive}/>
      <div className="chat" ref={chatContainerRef}>
        <MessageList userMessages={userMessages} newMessageStartId={newMessageStart}/>
      </div>
    <div className="message-sending-container" style={{ position: 'relative' }}>
    <span
        className="emoji-selector"
        ref={toggleButtonRef} onClick={toggleEmojiPicker}
      >
        😀
      </span>
      {isPickerVisible  && (
        <div ref={emojiPickerRef} className="emoji-picker" style={{ position: 'absolute', bottom: '120%', left: '10px'}}>
        <Picker data={data} onEmojiSelect={(e: any)=>addEmoji(e,message,setMessage)}
        emojiSize={20}
        perLine={8}
        sheetSize={30} 
        />
      </div>    
      )}
      <div className='input-inner-container ' >
      <input
        type="text"
        placeholder="Type a message..."
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)
        }
        onKeyDown={e=>handleKeyDown(e,SendMessageAddParam)}
      />
      <span className="icon-button">📎</span> {/* File Attachment Icon */}
      <span className="icon-button">📷</span> {/* Camera Icon */}
      </div>
      <span className="icon-button" onClick={e=>SendMessageAddParam()}>➤</span> {/* Send Message Icon */}
      
      <span className="icon-button">🎤</span> {/* Microphone Icon */}
    </div>
    {showScrollIcon && (
        
           <span 
        onClick={e=>scrollToBottom(chatContainerRef)} 
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '12%',
          cursor: 'pointer',
          padding:'2px 12px',
          fontSize: '20px',
          borderRadius:'50%',
          backgroundColor:'whiteSmoke',
          color:'black',
          fontWeight:'bolder'
        }}>
        {/* Replace with an arrow icon or image as needed */}
        ↓
      </span>       
      )} 
    </div>
  )
}
export default Chat
// const InitialLoad=async(token:string,friendUsername:string,dispatch: React.Dispatch<AppDataActionType>)=>
// {
//   console.log('calling backend',friendUsername,token)
//   var messages=await GetChat(token,friendUsername);
//   if(messages!=null)
//   {
//     dispatch({
//       type: 'AddMessages',
//       Messages: messages,
//       Chats: null,
//       CurrentChatUserName: friendUsername,
//       latestMessageId: null
//     })
//   }
// }
// const TryLoadLatestMessages=async (token:string,friendUsername:string,dispatch: React.Dispatch<AppDataActionType>,latestMessageId:number)=>{
//   var messages=await GetLatestChat(token,friendUsername,latestMessageId)
//   console.log(latestMessageId,messages)
//   if(messages!=null && messages.length>0)
//   {
//     dispatch({
//       type: 'AddLatestMessages',
//       Messages: messages,
//       Chats: null,
//       CurrentChatUserName: friendUsername,
//       latestMessageId: latestMessageId
//     })
//   }
// }

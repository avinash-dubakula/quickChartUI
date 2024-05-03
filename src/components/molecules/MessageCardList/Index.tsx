import React, { useContext } from 'react'
import './index.css'
import { IChat } from '../../../types/AppData/Message/Types';
import { AppDataContext } from '../../../contexts/AppDataContextProvider';
import { handleChatClick } from './MessageCardListLogic';
import { getInitials } from './MessageCardListLogic';
import { SignalRContext } from '../../../contexts/SignalRContextProvider';
type MessageCardListProps = {
    chats: IChat[];
    isSpam:boolean // This expects an array of IChat objects
  };
  
  // Update the MessageCardList component to accept chats prop
  const MessageCardList: React.FC<MessageCardListProps> = ({ chats ,isSpam}) => {
    console.log('chats',chats)
    const {Data,dispatch} = useContext(AppDataContext);
    const {Data:signalRData}=useContext(SignalRContext);
    var activeUserNames:string[]=[];
    if(signalRData.activeUserNames!=null)
      {
        activeUserNames=signalRData.activeUserNames;
      }
    const messageStyle = {
      backgroundColor: isSpam ? 'white' : 'green',
      color:isSpam?'red':'white',
      border:isSpam?'1px solid red':''
      };
      
    return (
        <div>
          {chats.map((chat, index) => (
            <div key={`message-card-${index}`} className={`chat-card ${Data?.activeChatUserName==chat.friendUserName?'bg-secondary text-white':''}`} onClick={()=>handleChatClick(chat.friendUserName,dispatch)}>
              <div className='d-flex'>
              <div style={{width:'15%'}} className='d-flex flex-column justify-content-center'>
              <div className="chat-profile">
              {chat.profilePhotoUrl?.length > 0 ? (
                <div className="profile-container text-bg-">
                  <img src={chat.profilePhotoUrl} alt="Profile" className="profile-photo" />
                  {activeUserNames.includes(chat.friendUserName) && <div className="online-status"></div>}
                </div>
              ) : (
                <div className="profile-container">
                  <div className="profile-initials">{getInitials(chat.friendName??"Dummy rao")}</div>
                  {activeUserNames.includes(chat.friendUserName) && <div className="online-status"></div>}
                </div>
              )}
            </div>
              </div>
              <div className=''style={{width:'85%'}} >
              <div className="msglist-item-header">
                <h3 className='m-0 p-0 friend-name-display'>{chat.friendName}</h3>
                {chat.unreadMessageCount > 0 && (
                  <div className="unread-count" style={messageStyle}>{chat.unreadMessageCount}</div>
                )}
              </div>
              <div className="chat-info">
                <div className="chat-message">
                  {chat.lastMessage}  
                </div>
                <div className="chat-date">{new Date(chat.lastMessageDate).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' })}</div>
              </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      );
  };
export default MessageCardList
import React from 'react'
import { ReactComponent as CallIcon } from '../../../assets/images/Chat/CallIcon.svg';
import { ReactComponent as VideoCallIcon } from '../../../assets/images/Chat/VideoCallIcon.svg';
import { ReactComponent as NoProfileIcon } from '../../../assets/images/Chat/NoProfileImage.svg';
import { ReactComponent as MoreIcon } from '../../../assets/images/Chat/MoreIcon.svg'; // Assume you have a MoreIcon
import { IChat } from '../../../types/AppData/Message/Types';
import { deleteChatHandler, closeChatHandler } from '../../pages/Chats/Chat/Logic';
import { AppDataActionType } from '../../../types/AppData/Context/Types';
import './Index.css'
import { NavigateOptions, useNavigate } from 'react-router-dom';
export interface IChatHeader{
    userChat: IChat | null,
    isMenuVisible: boolean,
    toggleMenuVisibility: () => void,
    appDispatch: React.Dispatch<AppDataActionType>,
    isActive:boolean
}
export interface CallState {
  userName:string|null
}
const ChatHeader:React.FC<IChatHeader> = ({userChat,isMenuVisible,toggleMenuVisibility,appDispatch,isActive}) => {
  const navigate=useNavigate();
  var userName:string|null=null;
  if(userChat)
    {
      userName=userChat.friendUserName;
    }
  const callHandler=()=>{
    const options: NavigateOptions = {
      state: { userName } as CallState,
    };
    navigate('/call', options);
  }
  return (
    <div className='chat-header shadow '>
        <div className='left-box'>
        {
            (userChat?.profilePhotoUrl??"").length > 0 ? (
              <img src={userChat?.profilePhotoUrl} alt={userChat?.friendName} className={`profile-image ${isActive?"user-active":"user-in-active"}`}></img>
            ) : (
              <NoProfileIcon className={`no-profile-icon ${isActive?"user-active":"user-in-active"}`} />
            )
          }
        <h3 className=''>{userChat?.friendName}</h3>
        </div>
        <div className='right-box'>
          <CallIcon className='pt-2 pb-2' onClick={callHandler}></CallIcon>
          <VideoCallIcon className='pt-2 pb-2' style={{marginLeft:'10px'}}></VideoCallIcon>
          <MoreIcon className=' pt-3 pb-3' style={{marginLeft:'10px'}} onClick={toggleMenuVisibility}></MoreIcon>

        {/* Dropdown menu */}
        <div className={`menu ${isMenuVisible ? 'active' : ''}`}>
          <div className="menu-item" onClick={() => {deleteChatHandler(toggleMenuVisibility)}}>Delete Chat</div>
          <div className="menu-item" onClick={() => {closeChatHandler(toggleMenuVisibility,appDispatch)}}>Close Chat</div>
        </div>
        </div>
      </div>
  )
}

export default ChatHeader

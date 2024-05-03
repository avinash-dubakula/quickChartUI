import React, { useContext, useEffect } from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import MessageCardList from '../../../molecules/MessageCardList/Index'
import { IChat } from '../../../../types/AppData/Message/Types'
import { AppDataContext } from '../../../../contexts/AppDataContextProvider'

import { AppDataActionType } from '../../../../types/AppData/Context/Types'
import { AuthContext } from '../../../../contexts/AuthContextProvider'
import { GetChats } from '../../../../contexts/AppDataLogic'
const ChatBar = () => {
  const {Data:appData,dispatch}=useContext(AppDataContext);
  var chats:IChat[]|null=null;
  if(appData!=null && appData.chats!=null)
    {
      var temp1=GetChats(appData.chats)
      if(temp1!=null)
        {
          chats=temp1;
        }
    }
  return (
    <div className='d-flex w-100 h-100'>
      <div className='chat-left-container'>
        <div className='chat-heading'>Chats</div>
        <div className='message-list-container'>
          {chats!=null?
          <MessageCardList chats={chats} isSpam={false}></MessageCardList>
          :''
        }
        </div>
      </div>
    <div className='chat-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}

export default ChatBar

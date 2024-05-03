import React from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
const FriendsBar = () => {
  return (
    <div className='d-flex w-100 h-100'>
    <div className='chat-left-container'>
      <div className='chat-heading'>Chats</div>
    </div>
    <div className='chat-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}

export default FriendsBar

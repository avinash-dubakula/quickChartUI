import React from 'react'
import PropTypes from 'prop-types'
import {IMessageData, MessageStatus} from '../../../types/AppData/Message/Types'
import { formatTime, getStatusIcon } from './Logic'
interface MessageProps{
message:IMessageData
}
const Message:React.FC<MessageProps> = ({message}) => {

  return (
    <div
          className={`${message.isIncoming ? 'incoming-alignment' : 'outgoing-alignment'}`}
          data-date={message.actionAt}
        >
          <div className={`message ${message.isIncoming ? 'incoming' : 'outgoing'}`}>
          <span className="messageText">{message.messageStatus==MessageStatus.Deleted?"This message has been deleted":message.message}</span>
          <div className='d-flex flex-column align-content-end justify-content-end h-100'>
          <span className='message-time'>{formatTime(new Date(message.actionAt??new Date()))}</span>
          </div>
          <div className='d-flex flex-column align-content-end justify-content-end h-100'>
            {getStatusIcon(message.messageStatus,message.isIncoming, new Date(message.actionAt??new Date()))}
          </div>
          </div>
        </div>
  )
}

export default Message

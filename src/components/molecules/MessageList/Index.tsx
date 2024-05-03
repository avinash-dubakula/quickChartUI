import React from 'react'
import Message from '../Message/Index'
import { formatDate } from '../../pages/Chats/Chat/Logic'
import { IMessageBatch } from '../../../types/AppData/Message/Types'
import  './Index.css'
export interface IMessageList{
    userMessages: IMessageBatch[] | null
    newMessageStartId:number| null
}
const MessageList:React.FC<IMessageList> = ({userMessages,newMessageStartId}) => {
  return (
    <>
    {userMessages!=null && userMessages.map( batch=> 
    {
        return (
        <div key={`batch-${batch.batchDate}`}>
          <div className='visible-date-container'>
            <span className='visible-date'>{formatDate(new Date(batch.batchDate))}</span>
          </div>
          {batch.messages.map((msg,index) => {
            return <div key={`message-id-${index}`}>
            {(newMessageStartId!=null && newMessageStartId==msg.id)&&
                <h6 className='new-message-container'><span>New Messages</span></h6>
            }
            <Message message={msg} ></Message>
            </div>
            })}
        </div>
      )})}
    </>
  )
}

export default MessageList

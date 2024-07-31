import React, { FC } from 'react'
import './Index.css'
import { getInitials } from '../MessageCardList/MessageCardListLogic'
import { FriendRequest } from '../../../types/Friends/EntityTypes'
import { formatDate } from '../../pages/Chats/Chat/Logic'
import { formatTime } from '../Message/Logic'
export interface IRquestListProps{
    friendRequests:FriendRequest[]
    isIncoming:boolean
}
const RequestList:FC<IRquestListProps> = ({friendRequests,isIncoming}) => {
  return (
    <div className='requests-container '>
    <div>
    {friendRequests.map((request, index) => (
      <div key={index} className="d-flex " style={{ border: '1px solid #ccc', padding: '1px 10px' }}>
        <div className=" d-flex justify-content-center align-items-center ">
        {request.profileUrl!=null && request.profileUrl?.length > 0 ? (
                <img src={request.profileUrl} alt={request.senderName} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            ) : (
                <div className="profile-initials-2">{getInitials(request.senderName)}</div> 
            )}
          
        </div>
        <div className="" style={{flexGrow:1,marginLeft:'10px',gap:0}}>
          <div className='d-flex justify-content-between w-100 align-items-center'>
          <h3 className='m-0 p-0 requester-name-display'>{request.senderName}</h3>
          <h6 className='m-0 p-0'><small className='text-secondary'>{new Date(request.sentAt).toLocaleDateString()}</small></h6>
          </div>
          <div className='ps-2 pb-2'>
            {isIncoming?
            <>
            <button type='button' className="btn btn-success btn-sm mr-3">Accept</button>
            <button type='button' className="btn btn-danger btn-sm">Decline</button>
            </>:
            <>
            <span className='btn btn-sm mr-3 pl-0'>Sent At : {formatTime(new Date(request.sentAt))}</span>
            <button type='button' className="btn btn-danger btn-sm">Delete Request</button>
            </>}
          
          </div>
        </div>
      </div>
    ))}
  </div>
    </div>
  )
}

export default RequestList

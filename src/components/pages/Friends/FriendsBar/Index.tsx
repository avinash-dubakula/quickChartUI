import React, { useContext } from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import { FriendshipContext } from '../../../../contexts/FriendShipContextProvider';
import { IFriendData } from '../../../../types/Friends/EntityTypes';
import { getInitials } from '../../../molecules/MessageCardList/MessageCardListLogic';
const FriendsBar = () => {
  const {Data:friendData,dispatch:friendDispatch}=useContext(FriendshipContext);
  const friends:IFriendData[] =friendData.friends??[];
  return (
    <div className='d-flex w-100 h-100'>
    <div className='chat-left-container'>
      <div className='chat-heading'>Friends</div>
      <div className='requests-container '>
      <div>
      {friends.map((friend, index) => (
        <div key={index} className="d-flex " style={{ border: '1px solid #ccc', padding: '5px 10px' }}>
          <div className=" d-flex justify-content-center align-items-center ">
          {friend.profilePhotoUrl!=null && friend.profilePhotoUrl?.length > 0 ? (
                  <img src={friend.profilePhotoUrl} alt={friend.fullName} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              ) : (
                  <div className="profile-initials-2">{getInitials(friend.fullName)}</div> 
              )}
            
          </div>
          <div className="" style={{flexGrow:1,marginLeft:'10px',gap:0}}>
            <div className='d-flex justify-content-between w-100 align-items-center'>
            <h5 className='m-0 p-0'>{friend.fullName}</h5>
            <h6 className='m-0 p-0'><small className='text-secondary'> Friends From{friend.friendsFrom.toString()}</small></h6>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
          </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
    <div className='chat-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}

export default FriendsBar

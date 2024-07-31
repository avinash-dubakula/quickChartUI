import React, { useContext, useState } from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import { FriendRequest } from '../../../../types/Friends/EntityTypes';
import { FriendshipContext } from '../../../../contexts/FriendShipContextProvider';
import  DownArrow  from '../../../../assets/images/Requests/down-arrow-2.png';
import UPArrow  from '../../../../assets/images/Requests/up-arrow-2.png';
import RequestList from '../../../molecules/RequestList/Index';
const RequestBar = () => {
  const {Data:friendData,dispatch:friendDispatch}=useContext(FriendshipContext);
  const [isIncoming, setisIncoming] = useState(true);
  const friendRequests:FriendRequest[] =(isIncoming?friendData.friendRequests?.friendRequestsRecieved:friendData.friendRequests?.friendRequestsSent)??[];
  const handleButtonClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
    const target = event.currentTarget as HTMLButtonElement;
    var targetId=target.id;
    console.log(targetId+'********************************')
    if(targetId=='outgoing-req$')
      {
        setisIncoming(false);
      }
    else if(targetId=='incoming-req$')
      {
        setisIncoming(true);
      }
  }
  return (
    <div className='d-flex w-100 h-100'>
    <div className='request-left-container'>
      <div className='request-heading'>
      <h4>{isIncoming?'Incoming':'Sent'} Requests</h4>
      <div className="btn-group btn-toggle"> 
        <button id='incoming-req$' className={`btn  request-direction ${isIncoming?'request-active':''}`} onClick={handleButtonClick}><img src={DownArrow} width={25} height={25}/></button>
        <button id='outgoing-req$' className={`btn  request-direction ${!isIncoming?'request-active':''}`} onClick={handleButtonClick} ><img src={UPArrow} width={25} height={25}/></button>
      </div>
      </div>
      
     <RequestList friendRequests={friendRequests} isIncoming={isIncoming}></RequestList>
    </div>
    <div className='request-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}

export default RequestBar

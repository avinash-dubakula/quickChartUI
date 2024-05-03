import React from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import { FriendRequestData } from '../../../../types/AppData/FriendRequest/Types';
const RequestBar = () => {
  const friendRequests:FriendRequestData[] = [
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=AlexJohnson",
    },
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=AlexJohnson",
    },
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=AlexJohnson",
    },
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=AlexJohnson",
    },
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=AlexJohnson",
    },
    {
      senderName: "John Doe",
      senderUserName: "john.doe",
      friendUserId: "user123",
      sentAt: new Date("2024-03-20T08:45:00"),
      commonFriendsCount: 5,
      profileUrl: "",
    },
    {
      senderName: "Jane Smith",
      senderUserName: "jane.smith",
      friendUserId: "user456",
      sentAt: new Date("2024-03-19T10:30:00"),
      commonFriendsCount: 2,
      profileUrl: null,
    },
    {
      senderName: "Alex Johnson",
      senderUserName: "alex.johnson",
      friendUserId: "user789",
      sentAt: new Date("2024-03-18T14:15:00"),
      commonFriendsCount: 8,
      profileUrl: "https://via.placeholder.com/150/FFF000/000000?Text=AlexJohnson",
    }
  ];
  
  return (
    <div className='d-flex w-100 h-100'>
    <div className='request-left-container'>
      <div className='request-heading'>Requests</div>
      <div className='requests-container '>
      <div>
      {friendRequests.map((request, index) => (
        <div key={index} className="d-flex " style={{ border: '1px solid #ccc', padding: '5px 10px' }}>
          <div className=" d-flex justify-content-center align-items-center ">
          {request.profileUrl!=null && request.profileUrl?.length > 0 ? (
                  <img src={request.profileUrl} alt={request.senderName} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              ) : (
                  <div className="profile-initials-2">{getInitials(request.senderName)}</div> 
              )}
            
          </div>
          <div className="" style={{flexGrow:1,marginLeft:'10px',gap:0}}>
            <div className='d-flex justify-content-between w-100 align-items-center'>
            <h5 className='m-0 p-0'>{request.senderName}</h5>
            <h6 className='m-0 p-0'><small className='text-secondary'>{request.sentAt.toLocaleDateString()}</small></h6>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
            <h6 className='m-0 p-0'><small className='text-secondary'> {request.commonFriendsCount} common friends</small></h6>
            <div>
            <button type='button' className="btn btn-success btn-sm mr-3">Accept</button>
            <button type='button' className="btn btn-danger btn-sm">Decline</button>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
    <div className='request-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0][0];
  } else {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`;
  }
};
export default RequestBar

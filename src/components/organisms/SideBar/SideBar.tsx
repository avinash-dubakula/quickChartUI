import React, { useState } from 'react';
// Importing SVGs as React Components
import { ReactComponent as ChatIcon } from '../../../assets/images/SideBar/ChatIcon.svg'
import { ReactComponent as SpamIcon } from '../../../assets/images/SideBar/SpamIcon.svg';
import { ReactComponent as FriendRequestIcon } from '../../../assets/images/SideBar/FriendRequest.svg';
import { ReactComponent as FriendsIcon } from '../../../assets/images/SideBar/FriendsIcon.svg';
import { ReactComponent as GroupsIcon } from '../../../assets/images/SideBar/GroupsIcon.svg';
import './SideBar.css'
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const navigate=useNavigate()
  var pathData=location.pathname.split('/');
  const activeIcon=(pathData[1].length>0)?pathData[1]:'chats'
  const icons = [
    { id: 'chats', IconComponent: ChatIcon, label: 'Chats' },
    { id: 'spam', IconComponent: SpamIcon, label: 'Spam' },
    { id: 'friendRequest', IconComponent: FriendRequestIcon, label: 'Requests' },
    { id: 'Friends', IconComponent: FriendsIcon, label: 'Friends' },
    { id: 'groups', IconComponent: GroupsIcon, label: 'Groups' },
  ];

  const handleIconClick = (iconId: string) => {
    navigate(iconId)
  };

  return (
    <div className=''>
      {icons.map(({ id, IconComponent, label }) => (
        <div key={id} className={`icon-container `} onClick={() => handleIconClick(id)}>
          <IconComponent className={`p-3 ${activeIcon === id ? 'active' : ''}`} />
          <span className={` ${activeIcon==id?'icon-label active-icon-label':'icon-label'}`}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;

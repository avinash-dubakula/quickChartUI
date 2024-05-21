import React from 'react'
import '../Chat/Index.css'
import { ReactComponent as CallIcon } from '../../../../assets/images/Chat/CallIcon.svg';
import { ReactComponent as VideoCallIcon } from '../../../../assets/images/Chat/VideoCallIcon.svg';
import { ReactComponent as NoProfileIcon } from '../../../../assets/images/Chat/NoProfileImage.svg';
const AddUser = () => {
  const dummy={
    name:"Vijay Marisetti",
    profileurl:""

  }
  return (
    <div className='chat-container'>
      <div className='chat-header shadow '>
        <div className='left-box'>
        {
            dummy.profileurl.length > 0 ? (
              <img src={dummy.profileurl} alt={dummy.name} className="profile-image"></img>
            ) : (
              <NoProfileIcon className="no-profile-icon" />
            )
          }
        <h3 className=''>{dummy.name}</h3>
        </div>
        <div className='right-box'>
          <CallIcon className='p-2'></CallIcon>
          <VideoCallIcon className='p-2'></VideoCallIcon>
        </div>
      </div>
    </div>
  )
}

export default AddUser

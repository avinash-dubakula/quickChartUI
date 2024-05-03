import React from 'react'
import './Index.css'
import { ReactComponent as NoProfileIcon } from '../../../assets/images/Chat/NoProfileImage.svg';
const ProfileCard = () => {
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
         
        </div>
      </div>
    </div>
  )
}

export default ProfileCard

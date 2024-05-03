import React from 'react'
import '../Spam/Index.css'
import '../../Chats/Chat/Index.css'
import { ReactComponent as CallIcon } from '../../../../assets/images/Spam/PhoneDisabled.svg';
import VideoDiabled from '../../../../assets/images/Spam/VideoDisabled.png'
import { ReactComponent as NoProfileIcon } from '../../../../assets/images/Chat/NoProfileImage.svg';
const Spam = () => {
  const dummy={
    name:"Vijay Marisetti",
    profileurl:""

  }
  return (
    <div className='chat-container'>
      <div className='text-center bg-danger text-light'>
        <h5 className='header-warning-text'>Do Not Reply to a Spam Unless you are sure about the user</h5>
        <h6 className='header-info-text mb-0'>You Cannot call. Add them as friend to enable other services</h6>
      </div>
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
          <CallIcon className='p-2 m-1'></CallIcon>
          <img src={VideoDiabled} className='p-2 m-1'></img>
        </div>
      </div>
    </div>
  )
}

export default Spam

import React, { useContext, useEffect } from 'react'
import './Index.css'
import '../../Chats/ChatBar/Index.css'
import { Outlet } from 'react-router-dom'
import MessageCardList from '../../../molecules/MessageCardList/Index';
import { IChat } from '../../../../types/AppData/Message/Types';
import { AppDataContext } from '../../../../contexts/AppDataContextProvider';
import { AuthContext } from '../../../../contexts/AuthContextProvider';
import { AppDataActionType } from '../../../../types/AppData/Context/Types';
import { GetChats } from '../../../../contexts/AppDataLogic';
const SpamBar = () => {
  const {Data: AppData,dispatch} = useContext(AppDataContext);
  const {AuthData}=useContext(AuthContext);
  var spamChats:IChat[]|null =null ;
  if(AppData!=null && AppData.chats!=null )
    {
      const temp1=GetChats(AppData.chats)
      if(temp1!=null)
        {
          spamChats=temp1;
        }
    }
  console.log('chatsData',spamChats)
  useEffect(() => {
    // var token=AuthData?.userAuthenticationData?.token;
    // if(token)
    // {
    //   SpamChatInvoke(token,dispatch)
    // }
    
  }, [])
  return (
    <div className='d-flex w-100 h-100'>
    <div className='chat-left-container'>
      <div className='chat-heading'>Spam Messages</div>
      {spamChats!=null && spamChats!=undefined?
          <MessageCardList chats={spamChats} isSpam={true}></MessageCardList>
          :''
        }
    </div>
    <div className='chat-right-container'>
    <Outlet/>
    </div>
    </div>
  )
}
// const SpamChatInvoke= async (bearerToken:string,dispatch:React.Dispatch<AppDataActionType>)=>{
//   var chats=await GetChats(bearerToken,true)
//   if(chats!=null)
//   {
//     // dispatch({
//     //   Chats: chats,
//     //   type: 'AddChats',
//     //   Messages: null,
//     //   CurrentChatUserName: null,
//     //   latestMessageId: null
//     // })
//   }
// }
export default SpamBar

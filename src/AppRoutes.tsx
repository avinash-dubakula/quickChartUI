import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Blank from './components/molecules/Blank/Index'
import ChatWrapper from './components/molecules/ChatWrapper/Index'
import NoChatSelected from './components/molecules/NoChatSelected/Index'
import ProfileCard from './components/organisms/ProfileCard/Index'
import ChatBar from './components/pages/Chats/ChatBar/Index'
import Home from './components/pages/Home/Index'
import RequestBar from './components/pages/Requests/RequestBar/Index'
import Spam from './components/pages/Spams/Spam/Index'
import SpamBar from './components/pages/Spams/SpamBar/Index'
import LoginOrSignUp from './components/pages/Authorize/Login/Index';
import { AppDataContext } from './contexts/AppDataContextProvider'
import { AuthContext } from './contexts/AuthContextProvider'
import { InitalLoadChats } from './AppLogic'
import { useSignalR } from './Hooks/UseSignalR/Index'
import { InitialAppDataActionType } from './types/AppData/Context/Types'
import { TimerComponent } from './components/molecules/Dummy'
import PutDelieveredAck from './api/Chat/PutDelieveredAck'
import { SignalRContext } from './contexts/SignalRContextProvider'
const AppRoutes = () => {
  console.log('App Route ')
  const {Data:AppData,dispatch:appDispatch}=useContext(AppDataContext);
  const {AuthData}=useContext(AuthContext);
  const {dispatch:signalRDispatch}=useContext(SignalRContext);
  const {StartConnection,isStart}=useSignalR("https://localhost:7058/ChatHub");
  const [isDeliveryAckSent, setIsDeliveryAckSent] = useState(false);
  const [isSendingAck, setisSendingAck] = useState(false);
  const LoadChats=async ()=>{
    
    if(AuthData !=null && AuthData.userAuthenticationData !=null && AuthData.userAuthenticationData.token)
      {       
        if(AppData!= null && AppData.chats ==null)
          {
            //inital dbFetch
            console.log('initial db fetch')
            var loadResult= await InitalLoadChats(AuthData.userAuthenticationData.token,false,100,appDispatch,signalRDispatch);
             if(loadResult)
              {
                setIsDeliveryAckSent(!isDeliveryAckSent);
              }
          }
      }
      
      
  }
  useEffect(() => {
    console.log('App Route Effect')
    LoadChats();
  }, [AuthData?.userAuthenticationData?.token])
  useEffect(() => {
    if(AppData!=null && AppData.chats!=null && AppData.chats.dataFetchedTime!=null)
      {
        var isUpdaterequired=false;
        if(AppData.deliveryStatusSent!=null)
        {
          isUpdaterequired=AppData.deliveryStatusSent!=AppData.chats.dataFetchedTime
        }
        else{
          isUpdaterequired=true;
        }
        if(isUpdaterequired)
          {
            const sendDeliveryAck=async ()=>{ 
              var updateResult:boolean=false;//call api
              if(AppData!=null && AppData.chats!=null)
                {
                  if(AppData.chats.dataFetchedTime!=null && AuthData!=null && AuthData.userAuthenticationData!=null && isSendingAck==false)
                    {
                      var datafetchedTime=AppData.chats.dataFetchedTime;
                        setisSendingAck(true);
                          //Send the Message Delivered Ack
                          console.log('Sending the Delivery Ack');
                          var res=await PutDelieveredAck<boolean>(AuthData.userAuthenticationData.token,datafetchedTime.toString());
                          console.log('Delivery Ack Result',res);
                          if(res!=null)
                            {
                             updateResult=res;
                            }
                            setisSendingAck(false);
                    }
                }
                if(updateResult==true)
                  {
                    appDispatch({...InitialAppDataActionType,type:"DeliveryStatusSent"});
                    
                  }
            }
            //update messages as delievered 
            sendDeliveryAck();
          }
      }  
  }, [AppData?.chats?.dataFetchedTime,setIsDeliveryAckSent])
  
  useEffect(()=>{
    if(AppData?.chats?.chatData!=null && AppData?.chats?.chatData!=undefined)
      {
       
        if(!isStart)
          { 
            console.log('trying to start connection')
            StartConnection();
          }
          
     
      }
  },[AppData?.chats?.chatData,])
  return (
    <Routes>
        <Route path='/Login' element={<LoginOrSignUp action='Login'/>} />
        <Route path='/SignUp' element={<LoginOrSignUp action='SignUp'/>} />
        <Route path='/' element={<Home></Home>}>
        <Route path='/' element={<ChatBar/>}>
            <Route index element={<ChatWrapper  />}></Route>
          </Route>
          <Route path='chats' element={<ChatBar/>}>
            <Route index element={<ChatWrapper  />}></Route>
          </Route>
          <Route path='spam' element={<SpamBar/>}>
            <Route index element={<NoChatSelected />}></Route>
            <Route path=':name' element={<Spam></Spam>}> </Route>
          </Route>
          <Route path='friendRequest' element={<RequestBar/>}>
            <Route index element={<Blank />}></Route>
            <Route path='profile/:name' element={<ProfileCard></ProfileCard>}> </Route>
          </Route>
        </Route>
        <Route path='*' element={<>Page Not Found</>}></Route>
        <Route path='test' element={<><TimerComponent></TimerComponent></>}></Route>
      </Routes>
  )
}

export default AppRoutes

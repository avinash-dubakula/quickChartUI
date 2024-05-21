import React, { useEffect } from 'react';
import './App.css';
import './assets/styles/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContextProvider';
import Login from './components/pages/Authorize/Login/Index';
import NoChatSelected from './components/molecules/NoChatSelected/Index';
import Home from './components/pages/Home/Index';
import Chat from './components/pages/Chats/Chat/Index';
import ChatBar from './components/pages/Chats/ChatBar/Index';
import SpamBar from './components/pages/Spams/SpamBar/Index';
import Spam from './components/pages/Spams/Spam/Index';
import RequestBar from './components/pages/Requests/RequestBar/Index';
import Blank from './components/molecules/Blank/Index';
import ProfileCard from './components/organisms/ProfileCard/Index';
import { IMessageData, MessageStatus } from './types/AppData/Message/Types';
import AppDataContextProvider from './contexts/AppDataContextProvider';
import ChatWrapper from './components/molecules/ChatWrapper/Index';
import AppRoutes from './AppRoutes';
import SignalRContextProvider from './contexts/SignalRContextProvider';
import FriendShipContextProvider from './contexts/FriendShipContextProvider';
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthContextProvider>
      <AppDataContextProvider>
        <FriendShipContextProvider>
        <SignalRContextProvider>
        <AppRoutes/>
        </SignalRContextProvider>   
        </FriendShipContextProvider>
      </AppDataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;

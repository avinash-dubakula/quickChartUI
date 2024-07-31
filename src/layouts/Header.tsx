import React, { useContext, useEffect, useState } from 'react'
import { RiSearch2Line } from "react-icons/ri";
import { AuthContext } from '../contexts/AuthContextProvider';
import { ToastContainer, toast } from "react-toastify";
import './Header.css'
import { ReactComponent as LogoIcon } from '.././assets/images/AppLogo.svg';
import { useNavigate } from 'react-router-dom';
import { AppDataContext } from '../contexts/AppDataContextProvider';
import { InitialAppDataActionType } from '../types/AppData/Context/Types';
import { FriendshipContext } from '../contexts/FriendShipContextProvider';
import { InitialFriendshipActionType } from '../types/Friends/ContextTypes';
import { SignalRContext } from '../contexts/SignalRContextProvider';
import { InitialSignalRActionType } from '../types/SignalR/ContextTypes';
const Header = () => {
    const navigate=useNavigate();
    const {AuthData,dispatch} = useContext(AuthContext);
    const {dispatch:friendShipDispatch}=useContext(FriendshipContext);
    const {dispatch:appDispatch}=useContext(AppDataContext);
    const {dispatch:signalRDispatch}=useContext(SignalRContext);
    const UserName=AuthData?.userAuthenticationData?.userName;

  // Handle Logout
  const handleLogout = () => {
    dispatch({newState:null,type:"LOGOUT"})
    friendShipDispatch({...InitialFriendshipActionType,type:"LOGOUT"})
    signalRDispatch({...InitialSignalRActionType,type:"LOGOUT"})
    appDispatch({...InitialAppDataActionType,type:"LOGOUT"})
    // Implement logout logic here
  };

  // Handle Login (For demonstration purposes)
  const handleLogin = () => {
    navigate('/Login')
  };
  const handleSignup=()=>{
    navigate('SignUp')
  }
    return (
        <nav className="ui-header navbar navbar-expand-lg navbar-dark bg-dark ">
        <a className="navbar-brand text-white" href="#">
          <LogoIcon width="30" height="30" className="d-inline-block align-top" />
          <span className='app-name'>Quick Chat</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mx-auto">
            <form className="form-inline my-2 my-lg-0 position-relative" style={{ left: '100px' }}> {/* Adjust the left percentage as needed */}
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
          <ul className="navbar-nav ml-auto">
            {UserName!=undefined ? (
              <>
                <li className="nav-item mr-2">
                  <a className="nav-link text-white" href="#">{UserName}</a>
                </li>
                <li className="nav-item mr-5">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mr-2"> {/* Added margin-right for spacing */}
                  <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </li>
                <li className="nav-item mr-5">
                  <button className="btn btn-secondary" onClick={handleSignup}>Sign up</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      
    )
}

export default Header

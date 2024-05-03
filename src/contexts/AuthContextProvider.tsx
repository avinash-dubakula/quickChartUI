import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import AuthReducer from '../reducers/AuthReducer';
import {  IAuthData, AuthProvider, AuthenticationData, InitialAuthData } from '../types/Authorization/ContextTypes';

export const AuthContext = createContext<AuthProvider>({ AuthData: InitialAuthData, dispatch: () => null});

const AuthContextProvider = (props:any) => {
  const [authdata, dispatch] = useReducer(AuthReducer,InitialAuthData,(authdata:IAuthData):IAuthData=>{
    const sessionAuthData=sessionStorage.getItem('UserAuthData');
    if(sessionAuthData!=null)
    {
        const UserAuthData:IAuthData=JSON.parse(sessionAuthData);
        return UserAuthData;
    }
    
    return InitialAuthData
    });
  useEffect(() => {
    sessionStorage.setItem('UserAuthData',JSON.stringify(authdata));    
  }, [authdata])
  
  return (
    <AuthContext.Provider value={{AuthData:authdata, dispatch} }>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

import React from 'react'
import { AuthActionType, IAuthData } from '../types/Authorization/ContextTypes';

const AuthReducer = (oldState:IAuthData,action:AuthActionType):IAuthData => {
  if(action.type!=null)
  {
    switch(action.type)
    {
        case 'LOGIN':
            var userInformation= action.newState;
            return {userAuthenticationData:userInformation}
        case 'LOGOUT':
            return {
                userAuthenticationData:null
            }
        default:
            return oldState

    }
  }
  return oldState;
}


export default AuthReducer

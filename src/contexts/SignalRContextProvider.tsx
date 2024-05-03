import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import SignalRReducer from '../reducers/SignalRReducer';
import { ISignalRProvider, InitialSignalRData, ISignalRData } from '../types/SignalR/ContextTypes';

export const SignalRContext = createContext<ISignalRProvider>({ Data: InitialSignalRData, dispatch: () => null});

const SignalRContextProvider = (props:any) => {
  //Use Reducer With Lazy initialization
  const [signalRData, dispatch] = useReducer(SignalRReducer,InitialSignalRData,(authdata:ISignalRData):ISignalRData=>{
    const sessionAppData=sessionStorage.getItem('UserSignalRData');
    if(sessionAppData!=null)
    {
        const UserAppData:ISignalRData=JSON.parse(sessionAppData);
        return UserAppData;
    }
    
    // return InitialAuthData
    return InitialSignalRData;
    });
  useEffect(() => {
    sessionStorage.setItem('UserSignalRData',JSON.stringify(signalRData));    
  }, [signalRData])
  
  return (
    <SignalRContext.Provider value={{Data:signalRData, dispatch} }>
      {props.children}
    </SignalRContext.Provider>
  )
}

export default SignalRContextProvider

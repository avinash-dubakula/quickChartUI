import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import { IAppData, IAppDataProvider, InitialAppdata } from '../types/AppData/Context/Types';
import AppDataReducer from '../reducers/AppDataReducer';

export const AppDataContext = createContext<IAppDataProvider>({ Data: InitialAppdata, dispatch: () => null});

const AppDataContextProvider = (props:any) => {
  //Use Reducer With Lazy initialization
  const [appData, dispatch] = useReducer(AppDataReducer,InitialAppdata,(authdata:IAppData):IAppData=>{
    const sessionAppData=sessionStorage.getItem('UserAppData');
    if(sessionAppData!=null)
    {
        const UserAppData:IAppData=JSON.parse(sessionAppData);
        return UserAppData;
    }
    
    // return InitialAuthData
    return InitialAppdata;
    });
  useEffect(() => {
    sessionStorage.setItem('UserAppData',JSON.stringify(appData));    
  }, [appData])
  
  return (
    <AppDataContext.Provider value={{Data:appData, dispatch} }>
      {props.children}
    </AppDataContext.Provider>
  )
}

export default AppDataContextProvider

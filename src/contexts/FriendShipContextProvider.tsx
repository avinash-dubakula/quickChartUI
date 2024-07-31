import { createContext, useEffect, useReducer } from "react";
import { IFriendshipData, IFriendshipProvider, InitialFriendshipData } from "../types/Friends/ContextTypes";
import FriendshipReducer from "../reducers/FriendshipReducer";

export const FriendshipContext = createContext<IFriendshipProvider>({ Data: InitialFriendshipData, dispatch: () => null});

const FriendShipContextProvider = (props:any) => {
  //Use Reducer With Lazy initialization
  const [friendShipData, dispatch] = useReducer(FriendshipReducer,InitialFriendshipData,(friendshipData:IFriendshipData):IFriendshipData=>{
    const sessionAppData=sessionStorage.getItem('UserFriendShipData');
    if(sessionAppData!=null)
    {
        const UserfriendshipData:IFriendshipData=JSON.parse(sessionAppData);
        return UserfriendshipData;
    }
    
    // return InitialAuthData
    return InitialFriendshipData;
    });
  useEffect(() => {
    sessionStorage.setItem('UserFriendShipData',JSON.stringify(friendShipData));    
  }, [friendShipData])
  
  return (
    <FriendshipContext.Provider value={{Data:friendShipData, dispatch} }>
      {props.children}
    </FriendshipContext.Provider>
  )
}

export default FriendShipContextProvider

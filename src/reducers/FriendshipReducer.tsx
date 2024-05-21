import { IFriendshipActionType, IFriendshipData } from "../types/Friends/ContextTypes";

const FriendshipReducer = (oldState:IFriendshipData,action:IFriendshipActionType):IFriendshipData => {
    if(action.type!=null)
    {
      switch(action.type)
      {
            case 'SetFriendRequests':
              var requests=action.friendRequests;
              if(requests!=null)
                {
                    return {...oldState,friendRequests:requests}
                }
                return oldState
            case 'SetFriends':
                var friends=action.friends;
                if(friends!=null)
                    {
                        return {...oldState,friends:friends}
                    }
                    return oldState
            case 'SetFriendsAndRequests':
              var friends=action.friends;
              var requests=action.friendRequests;
              if(friends!=null && requests!=null)
                {
                    return {...oldState,friends:friends,friendRequests:requests}
                }
                return oldState
            default:
                return oldState
  
      }
    }   
    return oldState;
  }
  
  
  export default FriendshipReducer
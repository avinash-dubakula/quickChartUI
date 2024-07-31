import { IFriendshipActionType, IFriendshipData, InitialFriendshipData } from "../types/Friends/ContextTypes";

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
            case 'LOGOUT':
              return InitialFriendshipData
            case 'NEWREQUEST':
              if(action.newrequest!=null)
                { 
                  var newRequest=action.newrequest
                  var newState: IFriendshipData={...oldState}
                  if(newRequest.isIncoming && newState.friendRequests && newState.friendRequests.friendRequestsRecieved)
                    {
                      var isUpdateRequired=newState.friendRequests.friendRequestsRecieved.includes(newRequest.request)
                      if(isUpdateRequired)
                        {
                          var newOutgoing=[...newState.friendRequests.friendRequestsRecieved,newRequest.request];
                          newState.friendRequests.friendRequestsRecieved=newOutgoing;
                          return newState
                        }
                        return oldState
                    }
                    else if(newState.friendRequests && newState.friendRequests.friendRequestsSent){
                      var isUpdateRequired=newState.friendRequests.friendRequestsSent.includes(newRequest.request)
                      if(isUpdateRequired)
                        {
                          var newOutgoing=[...newState.friendRequests.friendRequestsRecieved,newRequest.request];
                          newState.friendRequests.friendRequestsSent=newOutgoing;
                          return newState
                        }
                        return oldState
                    }
                }
                return oldState
            default:
                return oldState
  
      }
    }   
    return oldState;
  }
  
  
  export default FriendshipReducer
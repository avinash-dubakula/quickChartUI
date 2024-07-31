import { IFriendData, INewFriendRequest } from "./EntityTypes";
import { FriendRequestData } from "./EntityTypes"

export interface IFriendshipData{
    friendRequests:FriendRequestData|null
    friends:IFriendData[]|null
}
export const InitialFriendshipData:IFriendshipData={
    friendRequests: null,
    friends: null
}
export interface IFriendshipProvider{
    Data:IFriendshipData,
    dispatch:React.Dispatch<IFriendshipActionType>
}
export interface IFriendshipActionType{
    type:string
    friends:IFriendData[]|null
    friendRequests:FriendRequestData|null
    newrequest:INewFriendRequest|null
}
export const InitialFriendshipActionType:IFriendshipActionType={
    type: "",
    friends: null,
    friendRequests: null,
    newrequest:null
}
export interface FriendRequest {
    senderName: string;
    senderUserName: string;
    friendUserId: string;
    sentAt: Date;
    commonFriendsCount: number;
    profileUrl: string|null;
  }
export interface INewFriendRequest{
  isIncoming:boolean;
  request:FriendRequest
}
export interface FriendRequestData{
  friendRequestsRecieved:FriendRequest[];
  friendRequestsSent:FriendRequest[];
}
export interface IFriendData {
    fullName: string;
    email: string;
    userName: string;
    friendsFrom: Date;
    commonFriendsCount: number;
    profilePhotoUrl: string;
    userId: string;
}
export interface IUserData{
  fullName: string;
  email: string;
  userName: string;
  profilePhotoUrl: string;
  userId: string;
}

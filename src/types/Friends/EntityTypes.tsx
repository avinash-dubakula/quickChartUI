export interface FriendRequestData {
    senderName: string;
    senderUserName: string;
    friendUserId: string;
    sentAt: Date;
    commonFriendsCount: number;
    profileUrl: string|null;
  }
export interface IFriendData {
    fullName: string;
    Email: string;
    UserName: string;
    friendsFrom: Date;
    commonFriendsCount: number;
    profilePhotoUrl: string;
    userId: string;
}

export interface FriendRequestData {
    senderName: string;
    senderUserName: string;
    friendUserId: string;
    sentAt: Date;
    commonFriendsCount: number;
    profileUrl: string|null;
  }
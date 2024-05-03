export interface IChat {
    friendName: string;
    lastMessage: string;
    lastMessageId:number
    lastMessageDate: string;
    friendUserName: string;
    unreadMessageCount: number;
    profilePhotoUrl:string;
  }
export interface IMessageBatch{
  batchDate:string
  messages:IMessageData[]
}
export interface IMessageData {
    id: number;
    isIncoming: boolean;
    message: string;
    messageStatus: MessageStatus;
    actionAt: string; // The "?" indicates that this property is optional
}
export interface IMessageResponse{
  message:IMessageData,
  friendUserName:string,
  batchDate:string
}
export interface IMessageModel {
  recieverUserName: string;
  message: string;
}
export enum MessageStatus {
  Sent,
  Delivered,
  Deleted,
  Seen,
}
export interface IMessageUpdate{
  messageId:number,
  friendUserName:string,
  newMessageStatus:MessageStatus
}
export interface IMessagesUpdateModel{
  friendUserName:string,
  dbFetchedTime:Date,
  deliveredTime:Date
  newStatus:MessageStatus
}
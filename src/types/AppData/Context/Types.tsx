import { AuthActionType } from "../../Authorization/ContextTypes"
import { IChat, IMessageBatch, IMessageData, IMessageResponse, IMessagesUpdateModel, MessageStatus } from "../Message/Types"
export interface IChatData{
    chat:IChat
    messageBatches:IMessageBatch[]
    newMessageIds:number[],
    seenTillMessageId:number|null
}
export interface IChats{
    chatData:IChatData[],
    dataFetchedTime:Date
}
export interface IAppData{
    chats:IChats|null,
    activeChatUserName:string|null,
    deliveryStatusSent:Date|null
}

export const InitialAppdata:IAppData={
    chats:null,
    activeChatUserName:null,
    deliveryStatusSent:null
}
export interface IAppDataProvider{
    Data:IAppData,
    dispatch: React.Dispatch<AppDataActionType>
}

export interface AppDataActionType{
    type:string
    initialChatData:IChats|null
    messageResponse:IMessageResponse|null
    // Messages:IMessageData[]|null
    // Chats:IChat[]|null
     currentChatUserName:string|null
     messagesUpdate:IMessagesUpdateModel|null
     seenAckId:number|null
    updateStatus:MessageStatus|null
    // latestMessageId:number|null
}
export const InitialAppDataActionType:AppDataActionType={
    type: "",
    initialChatData: null,
    currentChatUserName: null,
    messageResponse: null,
    messagesUpdate: null,
    seenAckId: null,
    updateStatus: null
}
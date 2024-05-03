import { AppDataActionType, IAppData, InitialAppDataActionType } from "../../types/AppData/Context/Types";
import { IMessageResponse, IMessagesUpdateModel } from "../../types/AppData/Message/Types";
import { SendMessageRecievedAck } from "../UseSignalR/Logic";


export const recievedMessage = (messageResponse: IMessageResponse, appDispatch: React.Dispatch<AppDataActionType>, Data: IAppData, token: string) => {
    console.log('recieve Message Event');
    appDispatch({ ...InitialAppDataActionType, type: "RecievedMessage", messageResponse: messageResponse });
    SendMessageRecievedAck(messageResponse, Data, token);

};
export const updateMessage = (messageResponse: IMessageResponse, appDispatch: React.Dispatch<AppDataActionType>) => {
    console.log('update Message Event');
    appDispatch({ ...InitialAppDataActionType, type: "RecievedMessageUpdate", messageResponse: messageResponse });
    console.log(messageResponse);
};
export const updateMessages = (messageModal: IMessagesUpdateModel,appDispatch:React.Dispatch<AppDataActionType>) => {    
    console.warn('Messages Update Signal', messageModal);
    appDispatch({...InitialAppDataActionType,type:"RecievedMessagesUpdate",messagesUpdate:messageModal})
};
// Define a function that will be used to subscribe to the message event    

export const subscribeToNewMessage = (connection: signalR.HubConnection, appDispatch: React.Dispatch<AppDataActionType>, Data: IAppData, token: string) => {
    connection.on('RecieveMessage', (messageResponse: IMessageResponse) => recievedMessage(messageResponse, appDispatch, Data, token));
};
export const subscribeToMessageUpdate = (connection: signalR.HubConnection, appDispatch: React.Dispatch<AppDataActionType>) => {
    connection.on('MessageUpdated', (messageResponse: IMessageResponse) => updateMessage(messageResponse, appDispatch));
};
export const subscribeToMessagesUpdate = (connection: signalR.HubConnection,appDispatch:React.Dispatch<AppDataActionType>) => {
    connection.on('MessagesUpdated', (messageModal: IMessagesUpdateModel) => updateMessages(messageModal,appDispatch));
};

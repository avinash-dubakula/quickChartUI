import { AppDataActionType, IAppData, InitialAppDataActionType } from "../../types/AppData/Context/Types";
import { IMessageResponse, IMessagesUpdateModel } from "../../types/AppData/Message/Types";
import { SendMessageRecievedAck } from "../UseSignalR/Logic";
import {toast} from 'react-toastify';
export const recievedMessage = async (messageResponse: IMessageResponse, appDispatch: React.Dispatch<AppDataActionType>, Data: IAppData, token: string) => {
    console.log('recieve Message Event');
    var res=await SendMessageRecievedAck(messageResponse, Data, token);
    if(res)
        {
            appDispatch({ ...InitialAppDataActionType, type: "RecievedMessage", messageResponse: messageResponse,updateStatus:res });
        }  
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
export const sendHubSignal = (connection: signalR.HubConnection,candidate: string, partnerClientId: string): void => {
    console.log('candidate', candidate);
    console.log('SignalR: called sendhubsignal');
    connection.invoke('sendSignal', candidate, partnerClientId).catch(errorHandler);
};
const errorHandler = (error:Error) => {
    if (error.message)
        toast.error('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error.message));
    else
    toast.error('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error));

    consoleLogger(error);
};
const isDebugging = true;
const consoleLogger = (val:any) => {
    if (isDebugging) {
        console.log(val);
    }
};

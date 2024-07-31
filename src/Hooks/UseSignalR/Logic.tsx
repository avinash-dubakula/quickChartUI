import { HubConnection, HubConnectionBuilder, HubConnectionState, IRetryPolicy, LogLevel, RetryContext } from "@microsoft/signalr";
import PutDeliveredStatus from "../../api/Chat/PutDeliveredStatus";
import { GetActiveChatUserName, GetMyUsername } from "../../contexts/AppDataLogic";
import { IAppData } from "../../types/AppData/Context/Types";
import { IMessageResponse, MessageStatus } from "../../types/AppData/Message/Types";
import { IAuthData } from "../../types/Authorization/ContextTypes";


export class CustomRetryPolicy implements IRetryPolicy {
    private maxAttempts = 5;

    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
        const { previousRetryCount } = retryContext;
        if (previousRetryCount < this.maxAttempts) {
            return Math.pow(2, previousRetryCount) * 1000; // exponential backoff strategy
        }
        return null; // stop retrying after max attempts
    }
}
export const SendMessageRecievedAck = async (messageResponse: IMessageResponse, Data: IAppData | null, token: string):Promise<MessageStatus|null> => {
    console.warn('trying to send recieved ACk',Data)
    if (Data != null) 
    {
        var activeChatUserName = GetActiveChatUserName(Data);
        if (messageResponse.friendUserName == activeChatUserName) 
        {
            console.log('Recieved a message that belongs to currently opened chat')
            var deliveryResult = await PutDeliveredStatus<boolean>(token ?? "", { friendUserName: messageResponse.friendUserName, messageId: messageResponse.message.id, newMessageStatus: MessageStatus.Seen });
            if(deliveryResult!=null)
                {
                    return MessageStatus.Seen;
                }
            console.log(messageResponse, deliveryResult);
        }
        else 
        {
            console.log('Recieved a message that belongs to other chat')
            var seenResult = await PutDeliveredStatus<boolean>(token ?? "", { friendUserName: messageResponse.friendUserName, messageId: messageResponse.message.id, newMessageStatus: MessageStatus.Delivered });
            if(seenResult!=null)
                {
                    return MessageStatus.Delivered
                }
            console.log(messageResponse, seenResult);
        }
    }
    return null
};
export const CreateConnection = (hubUrl: string): HubConnection => {
    const connection = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect(new CustomRetryPolicy())
        .configureLogging(LogLevel.Debug)
        .build();

    connection.onreconnecting((error: Error | undefined) => {
        console.assert(connection.state === HubConnectionState.Reconnecting);
        console.log(`Connection lost due to error "${error}". Reconnecting.`);
    });

    connection.onreconnected((connectionId: string | undefined) => {
        console.assert(connection.state === HubConnectionState.Connected);
        console.log(`Connection reestablished. Connected with connectionId "${connectionId}".`);
    });

    connection.onclose((error: Error | undefined) => {
        console.assert(connection.state === HubConnectionState.Disconnected);
        console.log(`Connection closed due to error "${error}".`);
    });
    return connection;
};
export const startConnection = async (connection: HubConnection | undefined,setisAcknowledgementSent: React.Dispatch<React.SetStateAction<boolean>>, AuthData: IAuthData) => {
    try {
        
        if (connection != undefined) {
        await connection.start().then(async () => {
            console.log('Connection started');
            var myUserName = AuthData && GetMyUsername(AuthData);
            if (myUserName != null && myUserName != undefined && connection) {
                connection.invoke("ConnectedAcknowledgement", myUserName).then(() => {
                    setisAcknowledgementSent(true);
                    console.log('Sent Acknowledgement' + (new Date().toLocaleTimeString()));

                });
            }
        });
    }
    } catch (err) {
        console.error('Error establishing connection:', err);
    }
};


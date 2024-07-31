import { HubConnection } from "@microsoft/signalr";


export interface ISignalR {
    hubConnection: HubConnection | undefined;
    StartConnection: () => void;
    isStart: boolean;
}
export interface ISignalRForWebRTC {
    hubConnection: HubConnection | undefined;
    isAcknowledgementSent:boolean;
    isCallHubStart: boolean;
    StartCallHubConnection: () => void;
}

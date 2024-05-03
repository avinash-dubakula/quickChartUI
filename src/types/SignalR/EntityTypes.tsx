import { HubConnection } from "@microsoft/signalr";


export interface ISignalRReturn {
    hubConnection: HubConnection | undefined;
    StartConnection: () => void;
    isStart: boolean;
}

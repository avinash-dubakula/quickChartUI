import { AppDataActionType, InitialAppDataActionType } from "../../types/AppData/Context/Types";
import { IMessageResponse } from "../../types/AppData/Message/Types";
import { IFriendshipActionType, InitialFriendshipActionType, InitialFriendshipData } from "../../types/Friends/ContextTypes";
import { INewFriendRequest } from "../../types/Friends/EntityTypes";

export const subscribeToNewFRequest = (connection: signalR.HubConnection, friendshipDispatch: React.Dispatch<IFriendshipActionType>) => {
    connection.on('NewFriendRequest', (newFriendRequest: INewFriendRequest) => newRequestHandle(newFriendRequest, friendshipDispatch));
};
export const newRequestHandle = (newFriendRequest: INewFriendRequest, friendshipDispatch: React.Dispatch<IFriendshipActionType>) => {
    console.log('new Friend Request ',newFriendRequest);
    friendshipDispatch({
        ...InitialFriendshipActionType, type: "NEWREQUEST",newrequest:newFriendRequest
    })
};
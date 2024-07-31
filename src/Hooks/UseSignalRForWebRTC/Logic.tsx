import { HubConnection } from "@microsoft/signalr";
import { GetMyUsername } from "../../contexts/AppDataLogic";
import { IAuthData } from "../../types/Authorization/ContextTypes";

export const startWebRTCConnection = async (connection: HubConnection | undefined,setisAcknowledgementSent: React.Dispatch<React.SetStateAction<boolean>>, AuthData: IAuthData) => {
    try {
        
        if (connection != undefined) {
        await connection.start().then(async () => {
            console.log('Connection started');
            var myUserName = AuthData && GetMyUsername(AuthData);
            if (myUserName != null && myUserName != undefined && connection) {
                connection.invoke("Join", myUserName).then(() => {
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
import { IMessageData, IMessageUpdate } from '../../types/AppData/Message/Types';
const PutDeliveredStatus  =async<T,> (bearerToken: string,messageUpdateModel:IMessageUpdate):Promise<T|null> => {
    
    try 
    {
        const response = await fetch(`api/Message/updateMessage`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify(messageUpdateModel)
        });
    
        
    
        if (response.ok) 
        {
            console.log(`Successfully send Message Delivered ${messageUpdateModel.messageId} to - ${messageUpdateModel.friendUserName}`)
            
            const data:T = await response.json() as T; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Send Message Delivered "+messageUpdateModel.friendUserName)
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Something Went Wrong while Sending Message Delivered '+messageUpdateModel.friendUserName);
        //console.error(error);
        return null;
    }
}


export default PutDeliveredStatus

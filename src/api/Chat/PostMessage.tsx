import { IMessageData, IMessageModel } from '../../types/AppData/Message/Types';
const PostMessage  =async<T,> (bearerToken: string,messageModal:IMessageModel):Promise<T|null> => {
    
    try 
    {
        const response = await fetch(`https://localhost:7058/api/Message`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify(messageModal)
        });
    
        
    
        if (response.ok) 
        {
            console.log(`Successfully send Messages ${messageModal.message} to - ${messageModal.recieverUserName}`)
            
            const data:T = await response.json() as T; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Load the Send message to "+messageModal.recieverUserName)
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Something Went Wrong while Sending message to '+messageModal.recieverUserName);
        //console.error(error);
        return null;
    }
}


export default PostMessage

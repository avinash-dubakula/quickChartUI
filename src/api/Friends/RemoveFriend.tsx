const RemoveFriend  =  async<T,>(bearerToken: string,receiverUserName:string):Promise<T[]|null> => {
    
    try 
    {
        const response = await fetch(`api/FriendShip/Remove/${receiverUserName}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${bearerToken}`
          },
        });
    
        
    
        if (response.ok) 
        {
            console.log('Successfully removed friend from friends list')
            
            const data:T[] = await response.json() as T[]; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Load the Friends Details")
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Error while removing friend from friends list');
        //console.error(error);
        return null;
    }
}


export default RemoveFriend
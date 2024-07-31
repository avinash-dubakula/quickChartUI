const PostFriendRequest  =  async<T,>(bearerToken: string,receiverUserName:string):Promise<T[]|null> => {
    
    try 
    {
        const response = await fetch(`api/FriendShip/Send/${receiverUserName}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${bearerToken}`
          },
        });
    
        
    
        if (response.ok) 
        {
            console.log('Successfully sent friend request')
            
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
        console.log('Something Went Wrong while sending friend request');
        //console.error(error);
        return null;
    }
}


export default PostFriendRequest
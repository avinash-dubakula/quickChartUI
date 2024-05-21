const FetchFriendRequests  =  async<T,>(bearerToken: string):Promise<T[]|null> => {
    
    try 
    {
        const response = await fetch(`api/FriendShip/FriendRequest`, 
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
            console.log('Successfully loaded the friends details')
            
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
        console.log('Something Went Wrong while fetching the Friends Details');
        //console.error(error);
        return null;
    }
}


export default FetchFriendRequests
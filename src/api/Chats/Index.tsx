import React from 'react'
import { IChat } from '../../types/AppData/Message/Types';

export const FecthChats = async <T,>(bearerToken: string,isSpam:boolean,minimumMessagesRequested:number):Promise<T|null> => {  
    try 
    {
        const response = await fetch(`https://localhost:7058/api/Message/Chats/${isSpam}/${minimumMessagesRequested}`, 
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
            console.log('Successfully loaded the latest Chats')
            
            const data:T = await response.json() as T; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Load the Latest Chats")
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Something Went Wrong while fetching the latest chats');
        //console.error(error);
        return null;
    }
}


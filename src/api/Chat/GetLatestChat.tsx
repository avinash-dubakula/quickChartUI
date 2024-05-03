import React from 'react'
import { IMessageData } from '../../types/AppData/Message/Types';

const GetLatestChat  =async (bearerToken: string,friendUserName:string,latestMessageId:number):Promise<IMessageData[]|null> => {
    
    try 
    {
        const response = await fetch(`https://localhost:7058/api/Message/Chat/Latest/${friendUserName}/${latestMessageId}`, 
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
            console.log('Successfully loaded the latest Messages')
            
            const data:IMessageData[] = await response.json() as IMessageData[]; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Load the Latest messages for "+friendUserName)
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


export default GetLatestChat

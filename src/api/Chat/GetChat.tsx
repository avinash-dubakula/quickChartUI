import React from 'react'
import { IMessageData } from '../../types/AppData/Message/Types';

const GetChat  =async (bearerToken: string,friendUserName:string):Promise<IMessageData[]|null> => {
    
    try 
    {
        const response = await fetch(`api/Message/Chat/${friendUserName}`, 
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
            console.log('Successfully loaded the Messages')
            
            const data:IMessageData[] = await response.json() as IMessageData[]; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Load the messages for "+friendUserName)
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Something Went Wrong while fetching the messages');
        //console.error(error);
        return null;
    }
}


export default GetChat

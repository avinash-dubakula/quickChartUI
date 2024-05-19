import React from 'react'
import { IMessagesSeenModel } from '../../types/AppData/Message/Types';

const PutSeenAck = async<T,>(bearerToken: string,model:IMessagesSeenModel) => {
    try 
    {
        const response = await fetch(`api/Message/SeenAck`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${bearerToken}`
          },  
          body:JSON.stringify(model)
        });
    
        
    
        if (response.ok) 
        {
            console.log(`Successfully send Message Delivered Ack`)
            
            const data:T = await response.json() as T; // Make sure to await the parsing of the JSON
            console.log('data',data)
            return data;
        } 
        else 
        {
            console.log("Unable to Send Message Delivered Ack")
            return null;
        }
    } 
    catch (error) 
    {
        console.log('Something Went Wrong while Sending Message Delivered Ack');
        //console.error(error);
        return null;
    }
}

export default PutSeenAck

import React from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider';
import { toast } from "react-toastify";
import { AuthenticationData, LoginModal } from '../../types/Authorization/ContextTypes';

const LoginUser =async (loginModal:LoginModal):Promise<AuthenticationData | null> => {

    try 
    {
        const response = await fetch('api/Authentication/Login', 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(loginModal)
        });
    
        console.log('Hello'); // This will now always print before checking the response status
    
        if (response.ok) 
        {
            toast.success('Logged In Successfully');
            const data = await response.json(); // Make sure to await the parsing of the JSON
            return data;
        } 
        else 
        {
            // Handle HTTP errors here
            if (response.status === 404) {
                toast.error('Invalid Credentials')
            }
            else{
                toast.error('Login Failed');
            }
            console.error('Server responded with status:', response.status);
            return null;
        }
    } 
    catch (error) 
    {
        toast.error('Something Went Wrong');
        //console.error(error);
        return null;
    }
}

export default LoginUser

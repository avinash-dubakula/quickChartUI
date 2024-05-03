import React from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider';
import { toast } from "react-toastify";
import { SignUpResult, SignupModal } from '../../types/Authorization/ContextTypes';

const SignUpUser =async (signupModal:SignupModal):Promise<SignUpResult | null > => {

    try 
    {
        const response = await fetch('https://localhost:7058/api/Authentication/Register', 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(signupModal)
        });   
        if (response.ok) 
        {
            toast.success('SignUp Successfull');
            var signUpResult:SignUpResult={IsSuccess:false,ValidationResult:null};
            return signUpResult;
        } 
        else 
        {
            // Handle HTTP errors here
            if (response.status === 400) {
                const data=await response.json();
                var signUpResult:SignUpResult={IsSuccess:false,ValidationResult:data}
                console.log('signup result '+data)
                toast.error('SignUp Failed')
                return signUpResult;
            }
            else{
                toast.error('SignUp Failed');
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

export default SignUpUser

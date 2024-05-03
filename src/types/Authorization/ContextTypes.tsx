import { IChat, IMessageData } from "../AppData/Message/Types"

export interface LoginModal
{
    UserNameOrEmail:string,
    Password:string
}
export interface SignupModal{
    UserName:string,
    Email:string,
    FirstName:string,
    LastName:string,
    Password:string
}
export interface AuthenticationData{
    userName:string
    emailId:string
    token:string,
    tokenExpiry:Date
}
export interface IAuthData{
    userAuthenticationData:AuthenticationData|null
}
export const InitialAuthData:IAuthData={
    userAuthenticationData:null
}
export interface AuthProvider {
    AuthData: IAuthData, 
    dispatch: React.Dispatch<AuthActionType>
    }

export interface AuthActionType{
    type:string,
    newState:AuthenticationData|null
}
export interface ValidationErrorResponse {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: Record<string, string[]>;
  }
export interface SignUpResult{
    IsSuccess:boolean;
    ValidationResult:ValidationErrorResponse|null
}
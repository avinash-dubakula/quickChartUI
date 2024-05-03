import { AuthenticationData } from "../types/Authorization/ContextTypes";

export const GetAccessToken=(userAuthenticationData: AuthenticationData | null):string=> {
    var token=userAuthenticationData?.token;
    return token??"";
}
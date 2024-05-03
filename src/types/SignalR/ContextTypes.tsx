export interface ISignalRData{
    frienduserNames:string[]|null
    activeUserNames:string[]|null
}
export const InitialSignalRData:ISignalRData={
    frienduserNames: null,
    activeUserNames: null
}
export interface ISignalRProvider{
    Data:ISignalRData,
    dispatch:React.Dispatch<SignalRActionType>
}
export interface SignalRActionType{
    type:string
    stringList:string[]|null
    string:string|null
}
export const InitialSignalRActionType:SignalRActionType={
    type: "",
    stringList: null,
    string: null
}
import { AppDataActionType, InitialAppDataActionType } from "../../../types/AppData/Context/Types"

export const handleChatClick=(friendUserName:string,dispatch: (value: AppDataActionType) => void)=>{
    if(friendUserName!=null)
    {
      dispatch({
        ...InitialAppDataActionType,
        type: 'SetActiveChat',
        currentChatUserName: friendUserName,
      })
    }
  }
export const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0][0];
  } else {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`;
  }
};

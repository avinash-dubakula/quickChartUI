import { toast } from "react-toastify";
import PostMessage from "../../../../api/Chat/PostMessage";
import { IAppData, AppDataActionType, InitialAppDataActionType } from "../../../../types/AppData/Context/Types";
import { IMessageResponse, IChat } from "../../../../types/AppData/Message/Types";
import { IAuthData } from "../../../../types/Authorization/ContextTypes";

export const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date > oneWeekAgo) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }); // Changed '2-digit' to 'numeric' for year
    }
  };
export const handleClickOutside = (
    event: MouseEvent,
    emojiPickerRef: React.RefObject<HTMLDivElement>,
    toggleButtonRef: React.RefObject<HTMLButtonElement>,
    setIsPickerVisible: (isVisible: boolean) => void
  ) => {
    const target = event.target as Node | null;
  
    if (
      emojiPickerRef.current &&
      target &&
      !emojiPickerRef.current.contains(target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(target)
    ) {
      setIsPickerVisible(false);
    }
  };
export const SendMessageHandler=async (bearerToken :string,userName:string,message:string):Promise<IMessageResponse | null>=>{
    if(bearerToken!=null && userName!=null && message!=null )
    {
      var sendingResult=await PostMessage<IMessageResponse>(bearerToken,{message,recieverUserName:userName})
      console.log(sendingResult);
      if(sendingResult!=null)
      {
        if(sendingResult.message.id>0)
        {
          return sendingResult;
        }  
      }
      
    }
    return null;
  }
export const SendMessage=async (userChat:IChat|null,AuthData:IAuthData | null,AppData:IAppData | null,sending: boolean,message: string,setsending: React.Dispatch<React.SetStateAction<boolean>>,setMessage: React.Dispatch<React.SetStateAction<string>>,appDispatch: React.Dispatch<AppDataActionType>)=>{
    console.log('sending Message Started');
    if(userChat!=null && AuthData!=null && AuthData.userAuthenticationData!=null && AppData!=null)
    {
      var token=AuthData.userAuthenticationData.token;
      var currentUserName=AppData.activeChatUserName;
      if(currentUserName!=null && sending==false && message.length>0)
        {
          console.log('sending Message')
          setsending(true);
          var sendingResult=await SendMessageHandler(token,currentUserName,message);
          console.log("SendMessage ",sendingResult);
          if(sendingResult!=null)
          {
            appDispatch({...InitialAppDataActionType,type:"SentMessage",messageResponse:sendingResult})
            setMessage('')
            
          }
          else{
            console.log('cannot send')
            toast.error('Cannot Send Message')
          }
          setsending(false);
        }
      
    }
  }
  
export  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>,SendMessageAddParam:() => void) => {
    if (event.key === 'Enter') {
      SendMessageAddParam();
    }
  };
export const addEmoji = (e: any,message: string,setMessage: React.Dispatch<React.SetStateAction<string>>) => {
  if ('native' in e) {
    const emoji = e.native;
    setMessage(message + emoji);
  }
};
export const scrollToBottom = (chatContainerRef: React.RefObject<HTMLDivElement>) => {
  if (chatContainerRef.current) {
    const scrollHeight = chatContainerRef.current.scrollHeight;
    chatContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: 'smooth'
    });
  }
};
export const onScroll = ( chatContainerRef: React.RefObject<HTMLDivElement>,setShowScrollIcon: (value: React.SetStateAction<boolean>) => void) => {  
  // Also, check if scrolled to bottom to control the visibility of scroll to bottom icon
  if (chatContainerRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollTop + clientHeight === scrollHeight;
    setShowScrollIcon(!isAtBottom);
  }
};
export const deleteChatHandler = (toggleMenuVisibility: () => void) => {
  console.log("Delete Chat clicked");
  toggleMenuVisibility()
  // Implementation to delete the chat
};

export const closeChatHandler = (toggleMenuVisibility: () => void,appDispatch: (value: AppDataActionType) => void) => {
  console.log("Close Chat clicked");
  toggleMenuVisibility()
  appDispatch({
    ...InitialAppDataActionType,
    type: 'REMOVEACTIVECHAT',
    initialChatData:null
  })
  // Implementation to close the chat
};
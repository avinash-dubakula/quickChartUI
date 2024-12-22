import React, { useContext } from 'react'
import { AppDataContext } from '../../../contexts/AppDataContextProvider'
import Chat from '../../pages/Chats/Chat/Index'
import NoChatSelected from '../NoChatSelected/Index'
import { IMessageData } from '../../../types/AppData/Message/Types'
interface ChatProps {
    messages: IMessageData[]
}
const ChatWrapper: React.FC = () => {
    const { Data } = useContext(AppDataContext)
    return Data?.activeChatUserName != null &&
        Data.activeChatUserName.length !== 0 ? (
        <Chat></Chat>
    ) : (
        <NoChatSelected />
    )
}

export default ChatWrapper

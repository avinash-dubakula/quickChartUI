import React, { useContext, useEffect, useState } from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import MessageCardList from '../../../molecules/MessageCardList/Index'
import { IChat } from '../../../../types/AppData/Message/Types'
import { AppDataContext } from '../../../../contexts/AppDataContextProvider'

import { AppDataActionType } from '../../../../types/AppData/Context/Types'
import { AuthContext } from '../../../../contexts/AuthContextProvider'
import { GetChats } from '../../../../contexts/AppDataLogic'
const ChatBar = () => {
    const { Data: appData, dispatch } = useContext(AppDataContext)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
            console.log('width >', width)
        }

        // Add event listener on mount
        window.addEventListener('resize', handleResize)

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    var chats: IChat[] | null = null
    if (appData != null && appData.chats != null) {
        var temp1 = GetChats(appData.chats)
        if (temp1 != null) {
            chats = temp1
        }
    }
    return (
        <div className='c-container w-100 h-100'>
            <div
                className={` ${
                    width < 500 &&
                    (appData.activeChatUserName === null
                        ? 'block-active'
                        : 'block-inactive')
                } chat-left-container`}
            >
                <div className='chat-heading'>Chats</div>
                <div className='message-list-container'>
                    {chats != null ? (
                        <MessageCardList
                            chats={chats}
                            isSpam={false}
                        ></MessageCardList>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div
                className={`${
                    width < 500 &&
                    (appData.activeChatUserName !== null
                        ? 'block-active'
                        : 'block-inactive')
                } chat-right-container `}
            >
                <Outlet />
            </div>
        </div>
    )
}

export default ChatBar

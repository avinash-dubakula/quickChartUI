import React, {
    ChangeEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { IUserData } from '../../../../types/Friends/EntityTypes'
import FetchUsers from '../../../../api/User/FetchUsers/Index'
import { AuthContext } from '../../../../contexts/AuthContextProvider'
import './Index.css'
import { getInitials } from '../../../molecules/MessageCardList/MessageCardListLogic'
import { SignalRContext } from '../../../../contexts/SignalRContextProvider'
import { FriendshipContext } from '../../../../contexts/FriendShipContextProvider'
import PostFriendRequest from '../../../../api/Friends/PostFriendRequest'
import { toast, ToastContainer } from 'react-toastify'
const AddFriend: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [users, setUsers] = useState<IUserData[]>([])
    const { AuthData } = useContext(AuthContext)
    const { Data: friendShipData, dispatch: friendShipDispatc } =
        useContext(FriendshipContext)
    const abortControllerRef = useRef<AbortController | null>(null)
    const { Data } = useContext(SignalRContext)
    const activeUserNames = Data.activeUserNames ?? []
    // Handle input changes
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
        console.log('Search Input Changed:', event.target.value)
    }
    const handleAddFriend = async (userName: string) => {
        var token = AuthData.userAuthenticationData?.token
        if (token != undefined) {
            var res = await PostFriendRequest(token, userName)
            if (res) {
                toast.success('Sent Request')
            } else {
                toast.warn('Cant send request')
            }
        } else {
            toast.warn('Session Expired, please login')
        }
    }
    const sentUserNames = (
        friendShipData.friendRequests?.friendRequestsSent ?? []
    ).map((r, index) => r.senderUserName)
    // Fetch users based on search input
    const fetchUsers = async (searchText: string) => {
        const token = AuthData.userAuthenticationData?.token
        if (token) {
            // Abort the previous fetch request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
            // Create a new AbortController for the new fetch request
            const controller = new AbortController()
            abortControllerRef.current = controller
            try {
                const searchResult = await FetchUsers<IUserData>(
                    token,
                    searchText,
                    { signal: controller.signal }
                )
                if (searchResult) {
                    setUsers([...searchResult])
                }
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Previous fetch aborted')
                } else {
                    console.error('Fetch error:', error)
                }
            }
        }
    }

    // Use effect to fetch users whenever the search input changes
    useEffect(() => {
        fetchUsers(searchInput)
    }, [searchInput])

    // Render the component
    return (
        <div className='add-friend-container'>
            <div className='add-friend-header'>
                <ToastContainer></ToastContainer>
                <h4>Add Friend</h4>
                <input
                    type='text'
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder='Search...'
                />
            </div>
            <div className='add-friend-body'>
                {users.map((user, index) => (
                    <div
                        className='d-flex w-75 m-2 p-2 bg-white add-friend-card'
                        key={`add-friend-${user.userName}`}
                    >
                        <div
                            style={{ width: '15%' }}
                            className='d-flex flex-column justify-content-center align-items-center'
                        >
                            <div className='chat-profile'>
                                {user.profilePhotoUrl?.length > 0 ? (
                                    <div className='profile-container text-bg-'>
                                        <img
                                            src={user.profilePhotoUrl}
                                            alt='Profile'
                                            className='profile-photo'
                                        />
                                        {activeUserNames.includes(
                                            user.fullName
                                        ) && (
                                            <div className='online-status'></div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='profile-container'>
                                        <div className='profile-initials'>
                                            {getInitials(
                                                user.fullName ?? 'Dummy rao'
                                            )}
                                        </div>
                                        {activeUserNames.includes(
                                            user.fullName
                                        ) && (
                                            <div className='online-status'></div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='' style={{ width: '85%' }}>
                            <div className='w-100 d-flex justify-content-between align-items-center pr-3'>
                                <h3 className='m-0 p-0 friend-name-display'>
                                    {user.fullName}
                                </h3>
                                <div className=''>{user.userName}</div>
                            </div>
                            <div className='w-100 d-flex justify-content-between align-items-center pr-3'>
                                <div className=''>{user.email}</div>
                                <div className=''>
                                    {sentUserNames.includes(user.userName) ? (
                                        <button className='p-2 bg-info text-white border-0 rounded disabled'>
                                            Friend Request Sent{' '}
                                        </button>
                                    ) : (
                                        <button
                                            className='p-2 bg-success text-white border-0 rounded'
                                            onClick={() =>
                                                handleAddFriend(user.userName)
                                            }
                                        >
                                            {' '}
                                            + Add friend
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddFriend

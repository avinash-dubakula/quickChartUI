import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../layouts/Header'
import './Index.css'
import SideBar from '../../organisms/SideBar/SideBar'
import { AppDataContext } from '../../../contexts/AppDataContextProvider'

const Home = () => {
    return (
        <div className='home'>
            <Header></Header>
            <div className='main-box'>
                <div className={`left-part bg-dark`}>
                    <SideBar></SideBar>
                </div>
                <div className='right-part'>{<Outlet></Outlet>}</div>
            </div>
        </div>
    )
}

export default Home

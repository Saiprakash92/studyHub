import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserNameContexts from './contexts/UserName/UserNameContext'
import Modal from './Modal'
import './Styles/All.css'
import { AiOutlineUser } from 'react-icons/ai'
import { SubjectList } from './SubjectList'
import { FaRegHandPeace } from "react-icons/fa"
import { FiLogOut } from 'react-icons/fi'
import AuthVerifyState from './contexts/Auth/AuthContext'
import { BsFillPersonPlusFill, BsPlus } from 'react-icons/bs'

export const Home = () => {
    const { UserName, setUserName } = useContext(UserNameContexts)
    const { isAuth, setisAuth } = useContext(AuthVerifyState)
    const nav = useNavigate()

    const { id } = useParams()
    useEffect(() => {
        setUserName(localStorage.getItem('User-data'))
        if (localStorage.getItem('Role') === 'Student') {
            setisAuth(false)
        } else {
            setisAuth(true)
        }
    }, [setUserName])


    const logout = () => {
       localStorage.clear()
        nav('/login')
    }

    return (
        <>
            <nav className='nav'>
                <h1>Welcome to Classroom {UserName} <FaRegHandPeace /></h1>
                <div className='div-home-nav-btn'>
                    <button onClick={logout}>Logout <FiLogOut /></button>
                    {isAuth && (
                        <>
                            <Modal />
                            <Link className='link-btn' to={`/addStudent/${id}`}>Add Student <BsFillPersonPlusFill /></Link>
                            <div className='input-drop-down'>
                                <span><AiOutlineUser /></span>
                                <select name="" id="" onChange={() => nav(`/teacherProfile/${id}`)}>
                                    <option value="">Teacher</option>
                                    <option value="">{UserName}</option>
                                </select>
                            </div>
                        </>
                    )}

                    {!isAuth && (
                        <div className='input-drop-down'>
                            <span><AiOutlineUser /></span>
                            <select name="" id="" onChange={() => nav(`/userProfile/${id}`)}>
                                <option value="">Student</option>
                                <option value="">{UserName}</option>
                            </select>
                        </div>
                    )}
                </div>
            </nav>
            <SubjectList />
        </>

    )
}

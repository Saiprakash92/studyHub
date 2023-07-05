import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BiChevronRight } from 'react-icons/bi'
import { SiSuperuser } from "react-icons/si"
import { Link, useNavigate } from 'react-router-dom'
import './Styles/All.css'

export const Register = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: "",
    })


    const SaveRegisterdata = (e) => {
        e.preventDefault()
        if (data.firstName === '' || data.lastName === '' || data.email === '' || data.password === "") {
            alert('All fields required')
        }
        axios.post('http://localhost:5000/api/register', data)
            .then((res) => {
                alert('Registered Sucessfully')
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setdata(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }
    return (
        <>
            <div className='form-body-register'>
                <div className='register-head-sub'>
                    <p>< BiChevronRight />Register</p>
                    <span>To your Classroom</span>
                </div>
                <form className='form-register'>
                    <div className='login-input'>
                        <AiOutlineUser className='icon-log' />
                        <input type="text" required name="firstName" value={data.firstName} placeholder='firstname' onChange={handleChange} />
                    </div >
                    <div className='login-input'>
                        <SiSuperuser className='icon-log' />
                        <input type="text" required name="lastName" value={data.lastName} placeholder='lastname' onChange={handleChange} />
                    </div>
                    <div className='login-input'>
                        <AiOutlineMail className='icon-log' />
                        <input type="email" required name="email" value={data.email} placeholder='Email' onChange={handleChange} />
                    </div>
                    <div className='login-input'>
                        <RiLockPasswordFill className='icon-log' />
                        <input type="password" required name="password" value={data.password} placeholder='passkey' onChange={handleChange} />
                    </div>
                    <button type='submit' className='form-container-btn' onClick={SaveRegisterdata}>Register</button>
                    <div className='create-account-btn'>
                        <span>create account</span>
                        <Link to={'/login'} > Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

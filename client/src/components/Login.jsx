import axios from 'axios';
import React, { useState } from 'react'
import './Styles/All.css'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { ImCancelCircle } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi'

export const Login = () => {
    const [toggleState, setToggleState] = useState(2);
    const [Error, setError] = useState('')
    const [StudentError, setErrorStd] = useState('')
    const nav = useNavigate()


    const [Studentdata, setStudentdata] = useState({
        email: "",
        ClassCode: ''
    })
    const [data, setdata] = useState({
        email: '',
        password: "",
    })


    //teacher login
    const VerifyBtnTeacher = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', data)
            .then((res) => {
                console.log(res.data.data);
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    var Role = res.data.data.Role;
                    localStorage.setItem('Role', Role)
                    var data = JSON.stringify(res.data.data);
                    localStorage.setItem('User-Creditinals', data);
                    localStorage.setItem('User-data', res.data.data.firstName)
                    nav(`/home/${res.data.data._id}`)
                }
                else {
                    nav(`/login`)
                }
            })

            .catch((err) => {
                setError(err.response.data.message)
            })
    }



    //student login
    const VerifybtnStudent = (c) => {
        c.preventDefault()
        axios.post('http://localhost:5000/api/studentlogin', Studentdata)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    var data = JSON.stringify(res.data.data);
                    var Role = res.data.data.Role;
                    localStorage.setItem('Role', Role)
                    localStorage.setItem('User-Creditinals', data);
                    localStorage.setItem('User-data', res.data.data.firstName)
                    nav(`/home/${res.data.data.AddedTeacherId}`)
                }
                else {
                    nav(`/login`)
                }
            })

            .catch((err) => {
                setErrorStd(err.response.data.message)
            })
    }






    //Toggle Button
    const toggleTab = (index) => {
        setToggleState(index);
    };
    //Save Teacher
    function handleChange(event) {
        const { name, value } = event.target
        setError('')
        setdata(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    //Student
    function handleChangeStudent(event) {
        const { name, value } = event.target
        setErrorStd('')
        setStudentdata(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }

    const disabledError = () => {
        setErrorStd('')
    }
    const disabledErrorTeacher = () => {
        setError('')
    }
    return (
        <div>
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Student
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Teacher
                </button>
            </div>
            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >
                    <p style={{
                        textAlign: "center", margin: 'unset', color: 'black', lineHeight: '36px',
                        borderBottom: '1px solid black'
                    }}>Join class</p>
                    {StudentError && (
                        <p className='error'>
                            <span className='error-svg'><BiError/></span>
                            <span>{StudentError}</span>
                            <span className='cancel'><ImCancelCircle onClick={disabledError} /></span>
                        </p>
                    )}
                    <div className='form-container-login'>
                        <form style={{ textAlign: "center" }}>
                            <img src={require('../Assets/profile.png')} alt="profile" />
                            <div className='login-input'>
                                <AiOutlineUser className='icon-log' />
                                <input name='email' placeholder='email' value={Studentdata.email} onChange={handleChangeStudent} />
                            </div>
                            <div className='login-input'>
                                <RiLockPasswordFill className='icon-log' />
                                <input name='ClassCode' type='password' placeholder='classCode' value={Studentdata.ClassCode} onChange={handleChangeStudent} />
                            </div>
                            <button className='form-container-btn' onClick={VerifybtnStudent}>Login</button>
                            <div className='create-account-btn'>
                                <span>create account</span>
                                <Link to={`/`}>register</Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <p style={{
                        textAlign: "center", margin: 'unset', color: 'black', lineHeight: '36px',
                        borderBottom: '1px solid black'
                    }}>Log into existing class</p>

                    {Error && (
                        <p className='error'>
                              <span className='error-svg'><BiError/></span>
                            <span>{Error}</span>
                            <span className='cancel'><ImCancelCircle onClick={disabledErrorTeacher} /></span>
                        </p>
                    )}
                    <div className='form-container-login'>
                        <form style={{ textAlign: "center" }}
                        >
                            <img src={require('../Assets/profile.png')} alt="profile" />
                            <div className='login-input'>
                                <AiOutlineUser className='icon-log' />
                                <input name='email' placeholder='email' value={data.email} onChange={handleChange} />
                            </div>
                            <div className='login-input'>
                                <RiLockPasswordFill className='icon-log' />
                                <input name='password' type='password' placeholder='password' value={data.password} onChange={handleChange} />
                            </div>
                            <button className='form-container-btn' onClick={VerifyBtnTeacher}>Login</button>
                            <div className='create-account-btn'>
                                <span>create account</span>
                                <Link to={`/`}>register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

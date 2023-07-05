import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import AuthVerifyState from './contexts/Auth/AuthContext'

export const SubjectList = () => {
    const { id } = useParams()
    const { isAuth, setisAuth } = useContext(AuthVerifyState)
    const [Subjectlistdata, setsubjectlist] = useState([])

    useEffect(() => {
        getAllSubjects()
    }, [id])
    const getAllSubjects = () => {
        axios.get(`http://localhost:5000/api/Findcreateclass/${id}`)
        
            .then((res) => {
                setsubjectlist(res.data.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }


    const deleteSubject = (e) => {
        axios.delete(`http://localhost:5000/api/deleteSubject/${e.target.id}`)
            .then(() => {
                getAllSubjects();
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <>
            <div className='subject-grid'>
                {Subjectlistdata.map((list, i) => {
                    return (
                        <div className='subj-list' key={i}>
                            <img src={require('../Assets/book.jpg')} width='200' alt="" />
                            <div className='pad'>
                                <Link to={`/subject/${list._id}`}>
                                    <li>Id:{list._id}</li>
                                    <li>teacherName:{list.TeachearName}</li>
                                    <li>SubjectName:{list.SubjectName}</li>
                                    <li>Description:{list.Description}</li>
                                    <li>Created Class On:{Date().split(' ')[0] + '-' + Date().split(' ')[1] + '-' + Date().split(' ')[2]}</li>
                                </Link>
                                <div className='options'>
                                    {isAuth && (
                                        <AiOutlineDelete title='Delete' className='link-btn-notes' id={list._id} onClick={deleteSubject} />
                                    )}
                                    <Link className='link-btn-notes'  rel="noreferrer" to={`/subject/${list._id}`}><AiOutlineEye /></Link>
                                </div>
                            </div>
                        </div>

                    )

                })}
            </div>
        </>
    )
}

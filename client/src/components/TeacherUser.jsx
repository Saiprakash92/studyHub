import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
export const TeacherUser = () => {
    const navigate = useNavigate()
    const [teacher, setteacher] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/findteacher/${id}`)
            .then((res) => {
                setteacher(res.data.data)
                var data = JSON.stringify(res.data.data);
                localStorage.setItem('User-Creditinals', data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const DeleteTeacher = () => {
        axios.delete(`http://localhost:5000/api/deleteteacher/${id}`,)
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {
                window.location.href = '/'
                console.log(err.message)
            })
    }

    return (
        <>
            <nav className='nav'>
                <h1>
                    Your Profile For classroom
                </h1>
                <div>
                    <Link className='link-btn' to={`/teacherEdit/${id}`} ><AiFillEdit /></Link>
                    <button title='delete' onClick={DeleteTeacher}><AiFillDelete /></button>
                    <Link className='link-btn' to={`/home/${id}`}>Go back</Link>
                </div>

            </nav>
            <p style={{ textAlign: "center" }}><i>Note :</i> Once deleted you cannot access to classroom as teacher</p>
            <table border='1' className='table-profile'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{teacher.firstName}</td>
                    </tr>
                    <tr>
                        <th>Surname</th>
                        <td>{teacher.lastName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{teacher.email}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{teacher.Role}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

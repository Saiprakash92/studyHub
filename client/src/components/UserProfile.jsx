import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'



export const UserProfile = () => {
    const navigate =useNavigate()
    const [student, setstudent] = useState([])
    const { id } = useParams()


    const dataParse = JSON.parse(localStorage.getItem('User-Creditinals'))
    const USerid = dataParse._id


    useEffect(() => {
        axios.get(`http://localhost:5000/student/${USerid}`)
            .then((res) => {
                setstudent(res.data.data)
                var data = JSON.stringify(res.data.data);
                localStorage.setItem('User-Creditinals', data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const Deletestudent = () => {
        axios.delete(`http://localhost:5000/api/deletestudent/${USerid}`,)
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
            <div>
                <nav className='nav'>
                    <h1>
                        Your Profile For classroom
                    </h1>
                    <div>
                        <Link className='link-btn' to={`/edit/${id}`} ><AiFillEdit /></Link>
                        <button title='delete' onClick={Deletestudent}><AiFillDelete /></button>
                        <Link className='link-btn' to={`/home/${id}`}>Go back</Link>
                    </div>
                </nav>
                <p style={{ textAlign: "center" }}><i>Note :</i> Once deleted you cannot access to classroom as student</p>
                <table border='1' className='table-profile'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{student.firstName}</td>
                        </tr>
                        <tr>
                            <th>Surname</th>
                            <td>{student.lastName}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{student.email}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{student.Role}</td>
                        </tr>
                        <tr>
                            <th>Id</th>
                            <td>{student._id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

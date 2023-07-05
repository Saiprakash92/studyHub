import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'

export const AddStudent = () => {
    const { id } = useParams()
    const [studentReg, setStudentreg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        ClassCode: ""
    })
    const [dataStudent, setdataStudent] = useState([])


    useEffect(() => {
        getsttdata()
    }, [])
    const sendstudentRegister = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/Stdmerge/${id}`, studentReg)
            .then((res) => {
                getsttdata()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleChangeStudent(event) {
        const { name, value } = event.target
        setStudentreg(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }

    const getsttdata = () => {
        axios.get(`http://localhost:5000/api/findspecifilestudent/${id}`)
            .then((res) => {
                setdataStudent(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const Deletestudent = (e) => {
        axios.delete(`http://localhost:5000/api/deletestudent/${e.target.id}`,)
            .then((res) => {
                console.log(res.message)
                getsttdata()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            <nav className='nav'>
                <h1>Add Student</h1>
                <Link className='link-btn' to={`/home/${id}`}>Go Back</Link>
            </nav>
            <div className='addstd-form-flex'>
                <div className='std-register-form-add-std'>
                    <form action="" style={{ width: "300px" }}>
                        <input type="text" name='firstName' placeholder='Student Firstname' value={studentReg.firstName} onChange={handleChangeStudent} />
                        <input type="text" name="lastName" placeholder='Student lastname' value={studentReg.lastName} onChange={handleChangeStudent} />
                        <input type="text" name='email' placeholder='Student email' value={studentReg.email} onChange={handleChangeStudent} />
                        <input type="text" name='ClassCode' placeholder='Student classcode' value={studentReg.ClassCode} onChange={handleChangeStudent} />
                        <button type='submit' title='Add student' className='link-btn' onClick={sendstudentRegister}>Add Student</button>
                    </form>
                </div>
                <div>
                    <h4>Added Students</h4>
                    <table border="1" cellPadding="4" cellSpacing="4">
                        <tbody>
                            <tr>
                                <td>firstname</td>
                                <td>lastName</td>
                                <td>ClassCode</td>
                                <td>Delete</td>
                            </tr>
                            {dataStudent.map((list, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{list.firstName}</th>
                                        <th>{list.lastName}</th>
                                        <th>{list.ClassCode}</th>
                                        <th>
                                            <button style={{ background: "transparent", border: "unset" }} title='Delete' id={list._id} onClick={Deletestudent}><AiFillDelete style={{ pointerEvents: "unset" }} /></button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

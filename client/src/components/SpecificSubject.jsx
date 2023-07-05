import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{AiOutlineRollback} from'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { SubjectNotes } from './SubjectNotes'




export const SpecificSubject = () => {
    const { id } = useParams()
    const [Subjectlistdata, setsubjectlist] = useState([])
    useEffect(() => {

        axios.get(`http://localhost:5000/api/findidofsubject/${id}`)
            .then((res) => {
                setsubjectlist(res.data.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [id])


    return (
        <>
            <div className='nav'>
                <Link  to={`/home/${Subjectlistdata.TeacherId}`}><  AiOutlineRollback  style = {{ color: "black", fontSize: "20px" ,background:"#e4e4e4" ,padding:"5px",borderRadius:"7px"} }/></Link>
                <p> SubjectName: {Subjectlistdata.SubjectName}</p>
                <p>  TeachearName: {Subjectlistdata.TeachearName}</p>
                <p>  Description: {Subjectlistdata.Description}</p>
            </div>
            <SubjectNotes />
        </>

    )
}

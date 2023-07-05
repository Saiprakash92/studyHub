import axios from "axios";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import {  useParams } from "react-router-dom";

export default function Modal() {
    const [modal, setModal] = useState(false);
    const { id } = useParams()


    const [subjectData, setsubjectdata] = useState({
        SubjectName: "",
        Description: "",
        TeachearName: "",
    })



    const saveSubject = () => {
        const { SubjectName, Description, TeachearName } = subjectData
        const data = { SubjectName, Description, TeachearName }
        axios.post(`http://localhost:5000/api/merge/${id}`, data)
            .then(() => {
                subjectData.SubjectName('')
                subjectData.Description('')
                subjectData.TeachearName('')
                setModal(false)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }



    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    function handleChangeSubject(event) {
        const { name, value } = event.target
        setsubjectdata(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    return (
        <>
            <button title="Create" onClick={toggleModal}>
                Create class
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h4>Create Subject <BsPlus /></h4>
                        <AiFillCloseCircle className="close-modal" onClick={toggleModal} />
                        <form action="" className="form-register-class">
                            <input type="text" placeholder="subject name" name="SubjectName" value={subjectData.SubjectName} onChange={handleChangeSubject} />
                            <input type="text" placeholder="description" name="Description" value={subjectData.Description} onChange={handleChangeSubject} />
                            <input type="text" placeholder="teacher name" name="TeachearName" value={subjectData.TeachearName} onChange={handleChangeSubject} />
                            <button type="submit" onClick={saveSubject}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
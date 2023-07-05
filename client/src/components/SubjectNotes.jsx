import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AiFillEye, AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { BsFiles } from 'react-icons/bs'
import { MdDoneOutline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import AuthVerifyState from './contexts/Auth/AuthContext'


export const SubjectNotes = () => {
  const { id } = useParams()
  const { isAuth, setisAuth } = useContext(AuthVerifyState)

  const [data, setdata] = useState([])
  const [announcements, setannouncements] = useState([])
  const [file, setfile] = useState()
  const [title, setiltle] = useState()

  useEffect(() => {
    getdatafiles()
  }, [])

  const sendSpecificSubjectData = (e) => {
    e.preventDefault()
    if (!file) {
      alert('File required')
    }
    if (!title) {
      alert('Title required')
    }
    if (!announcements) {
      return alert('Add Announcement for every files')
    }
    const data = new FormData();
    data.append('title', title)
    data.append('announcements', announcements)
    data.append('files', file)
    axios.post(`http://localhost:5000/single/${id}`, data)
      .then((res) => {
        getdatafiles()
        setannouncements('')
        setiltle('')

      })
      .catch((err) => {
        console.log(err)
      })

  }


  const getdatafiles = () => {
    axios.get(`http://localhost:5000/files/${id}`)
      .then((res) => {
        setdata(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const delteDocument = (id) => {
    axios.delete(`http://localhost:5000/files/delete/${id.target.id}`)
      .then((res) => {
        getdatafiles()
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return (

    <>
      {isAuth && (
        <>
          <div className='input-details'>
            <label htmlFor="file">
              <AiOutlinePlus className='select-file' />
            </label>
            <input type="file" id='file' style={{ display: "none" }} onChange={(e) => setfile(e.target.files[0])} className='input-tile' />
            <input type="text" placeholder='...Add your title' value={title} onChange={(e) => setiltle(e.target.value)} />
            <span></span>
            <HiOutlineSpeakerphone className='select-file' />
            <input type="text" placeholder='...Add announcement' value={announcements} onChange={(e) => setannouncements(e.target.value)} />
            <MdDoneOutline type='submit' className='add' onClick={sendSpecificSubjectData} />
          </div>
          <hr />
        </>
      )}
      <div className='main-content-div'>
        <div className='firs-div'>
          <span style={{ display: "flex", alignItems: "center" }}> <BsFiles /> &nbsp;Number of files : {data.length}</span>
          {data.map((list, i) => {
            return (
              <p key={i} className='announce'>
                <HiOutlineSpeakerphone />
                &nbsp;
                {list.announcements}
              </p>
            )
          })}
        </div>

        <div className='sub-notes'>
          {data.map((list, i) => {
            return (
              <div className='subject-data' key={i}>
                <span className='span-title' >Title: {list.title}</span>
                <div>
                  <embed src={list.path} type="" />
                </div>
                <div className='details-main'>
                  <span>Date:{list.Date}</span>
                  <div>
                    <a className='link-btn-notes' href={list.path} target='_blank'><AiFillEye /></a>
                    {isAuth && (
                      <AiOutlineDelete id={list._id} title='delete' onClick={delteDocument} className='link-btn-delete-notes' />

                    )}
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

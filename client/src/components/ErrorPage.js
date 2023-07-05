import React from 'react'
import { Link } from 'react-router-dom'
import './Styles/All.css'

export const ErrorPage = () =>{
    return (
        <div className='error-page'>
            <h1>Eror go back</h1>
            <Link>Go Back</Link>
        </div>
    )
}

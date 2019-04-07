import React from 'react'

export default function FormHeader(){
    return(
        <header style = {headerStyle}>
            <h1>Cases List</h1>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
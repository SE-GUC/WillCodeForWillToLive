import React from 'react';
import { Link } from 'react-router-dom';

export default function LawyerHeader() {
  return (
    <header style = {headerStyle}>
        <h1>Lawyer's CasesList</h1>
        <Link style={linkStyle} to="/Lawyer">English</Link> | <Link style={linkStyle} to="/LawyerA">عربي</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color:'#fff',
  textDecoration: 'none'
}



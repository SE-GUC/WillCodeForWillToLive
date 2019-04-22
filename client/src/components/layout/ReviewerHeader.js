import React from 'react';
import { Link } from 'react-router-dom';

export default function ReviewerHeader() {
  return (
    <header style = {headerStyle}>
        <h1>Reviewer's CasesList</h1>
        <Link style={linkStyle} to="/Reviewer">English</Link> | <Link style={linkStyle} to="/ReviewerA">Arabic</Link>
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



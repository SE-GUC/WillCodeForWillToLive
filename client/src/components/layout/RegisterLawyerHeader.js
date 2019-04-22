import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <header style = {headerStyle}>
        <h1>Register a new lawyer</h1>
        <Link style={linkStyle} to="/RegisterLawyer">English</Link> | <Link style={linkStyle} to="/RegisterLawyerA">عربي</Link>
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

  export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

export default function InvestorHeader() {
  return (
    <header style = {headerStyle}>
        <h1>Investor's CasesList</h1>
        <Link style={linkStyle} to="/Investor">English</Link> | <Link style={linkStyle} to="/InvestorA">عربي</Link>
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



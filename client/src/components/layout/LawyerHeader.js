import React from 'react';
import { Link } from 'react-router-dom';

export default function LawyerHeader() {
  return (
    <header style = {headerStyle}>
        <h1>Lawyer's CasesList</h1>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}





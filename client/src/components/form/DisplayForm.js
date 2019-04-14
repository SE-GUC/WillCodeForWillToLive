import React, { Component } from 'react';
import nfetch from 'node-fetch'
//import { Link } from 'react-router-dom';

import axios from 'axios';
class DisplayForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.params.id,
            DisplayForms:[]
        }
    }
    
    
    componentDidMount(){
      axios.get('/api/Form/AllForms/'+this.state.id)
      .then(res => this.setState({DisplayForms:res.data}))
      .catch(error => console.log(error))
    }

    renderFrom = () => {
      return(
        <div className="DisplayForm">
        <h1>Display a Form depending on ID</h1>
        
        { this.state.map(form => 
            <div>
                {form.map(element => <span><b>{element.name}</b> {element.value} </span>)}
            </div>
        )}
       </div>
    );
  }
}

export default DisplayForm;

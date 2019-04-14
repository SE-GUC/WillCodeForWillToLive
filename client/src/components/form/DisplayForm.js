import React, { Component } from 'react';
import nfetch from 'node-fetch'
//import { Link } from 'react-router-dom';

import axios from 'axios';
class DisplayForm extends Component {
    constructor(props) {
      console.log(props)
        super(props)
        this.state = {
            id: props.match.params.id,
            DisplayForms:[]
        }
    }
    
    
    componentDidMount(){
      axios.get('/api/form/AllForms/'+this.state.id)
      .then(res => this.setState({DisplayForms:res.data}))
      .catch(error => console.log(error))
    }

    render() {
      return(
        <div className="DisplayForm">
        <h1>Display a Form depending on ID</h1>
        { this.state.DisplayForms.map(form => 
            <div>
                {form.map(element => <div><span><b>{element.name}</b> {element.value} </span><br/></div>)}
            </div>
        )}
       </div>
    );
  }
}

export default DisplayForm;

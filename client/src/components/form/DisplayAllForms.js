import React, { Component } from 'react';
import axios from 'axios';
import { Typography, Paper, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit*2,
      paddingBottom: theme.spacing.unit*2,
      background: '#e3e3e3',
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit,
  },

})

class DisplayForms extends Component {
    constructor(props) {
        super(props)
        this.props = props
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
      const classes = this.props.classes
      return(
        <div id="display Forms">
        { this.state.DisplayForms.map((form, index) =>
          <div id='form'>
            <div>
              <Link to={`/displayForm/${form._id}`}>
                <Paper className={classes.root} >
                  <Typography key={index.toString()} component='h3' variant='subheading' gutterBottom align='left'>
                    { form.nameEnglish? form.nameEnglish:form.nameArabic? form.nameArabic:`Company ${index+1}` }
                  </Typography>
                </Paper>
              </Link>
              {/* <span><b>{element.name}</b> {element.value} </span><br/> */}
            </div>
          </div>
        )}
       </div>
    )
  }
}

export default withStyles(styles)(DisplayForms)

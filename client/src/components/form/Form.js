import React, { useState, useEffect } from 'react'
import { TextField, Button, withStyles, Paper, Menu, MenuItem } from '@material-ui/core'
import axios from 'axios'
import Dropdown from './Dropdown'

const styles = theme =>  ({
  root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit*2,
      paddingBottom: theme.spacing.unit*2,
      background: '#e3e3e3',
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit,
  },
  button: {
      margin: theme.spacing.unit*0.5,
  },
  textField: {
      margin: theme.spacing.unit*0.5,
      width: 200,
  }
})

function Form ({classes}) {
  const [forms, setForms] = useState([])
  const [formData, setFormData] = useState({})
  const [lawDropdownState, setLawDropdownState] = useState(null)
  const [formDropdownState, setFormDropdownState] = useState(null)
  const [formFields, setformFields] = useState([])
  useEffect(_=>{
    axios('/api/formTemplate', {method: 'GET'})
    .then(res => {
      if(res.data){
        setForms(res.data)
      }
    }).catch(e => console.log(e))
  }, [])
  

  const handleLawDropdown = lawName => {
    const newFormData = formData
    newFormData.regulatingLaw = lawName
    setFormData(newFormData)
    setLawDropdownState(null)
  }

  const handleFormDropdown = formName => {
    const newData = {formName: formName}
    if(formData && formData.regulatingLaw) {
      newData.regulatingLaw = formData.regulatingLaw
    }
    setFormData(newData)
    setformFields(forms[forms.findIndex(f => f.formNameEnglish === formName)].fields)
    setFormDropdownState(null)
  }

  const handleFieldInput = (name, value) => {
    const newFormData = formData
    newFormData[name] = value
    setFormData(newFormData)
  }

  const sendForm = _ => axios('/api/form', {
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if(res.error){
        alert(JSON.stringify(res.error))
      } else {
        alert('Form created!')
      }
    }).catch(e => console.log(e))

    return (
      <div>
        <Paper className={classes.root}>
          <div id='drop-downs'>
            <Button
              className={classes.button}
              variant='contained'
              aria-owns={lawDropdownState? 'regulatingLawMenu':undefined}
              aria-haspopup='true'
              onClick={e => setLawDropdownState(e.currentTarget)}
            >
              {formData.regulatingLaw || 'Choose Regulating Law'}
            </Button>
            <Menu
            id='regulatingLawMenu'
            anchorEl={lawDropdownState}
            open={Boolean(lawDropdownState)}
            onClose={_=>setLawDropdownState(null)}
            >
              <MenuItem onClick={_ => handleLawDropdown('Law 72')}>Law 72</MenuItem>
              <MenuItem onClick={_ => handleLawDropdown('Law 195')}>Law 195</MenuItem>
            </Menu>
            <Button
              className={classes.button}
              variant='contained'
              aria-owns={formDropdownState? 'FormType':undefined}
              aria-haspopup='true'
              onClick={e => setFormDropdownState(e.currentTarget)}
            >
              {formData.formNameEnglish || 'Choose Form Type'}
            </Button>
            <Menu
            id='FormType'
            anchorEl={formDropdownState}
            open={Boolean(formDropdownState)}
            onClose={_=>setFormDropdownState(null)}
            >
              {forms.map((form, i) => 
                <MenuItem
                  key={i.toString()}
                  onClick={_ => handleFormDropdown(form.formNameEnglish)}
                >
                  {form.formNameEnglish}
                </MenuItem>
              )}
            </Menu>
          </div>
          <div id='form'>
            {formFields.map((field, i) =>
            field.fieldType.toLowerCase() === 'dropdown'?
            <Dropdown key={i.toString()} fieldName={field.nameEnglish} items={field.constraints.filter(e=>e.name==='item').map(e=>e.value)} handleInput={handleFieldInput} />:
            <TextField 
              key={i.toString()}
              variant='outlined'
              className={classes.textField}
              type={field.fieldType.toLowerCase()}
              onChange={e => handleFieldInput(field.nameEnglish, e.target.value)}
              label={field.nameEnglish}
            />)}
          </div>
          <Button className={classes.button} variant='contained' onClick={sendForm}>Submit</Button>
        </Paper>
      </div>
    )
}

export default withStyles(styles)(Form)

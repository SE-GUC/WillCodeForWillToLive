import React, { useState } from 'react'
import { Button, withStyles, TextField } from '@material-ui/core'
import Field from './Field'
import useFormState from './useFormState'
import axios from 'axios'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit*0.5,
    },
    textField: {
        margin: theme.spacing.unit*0.5,
        width: 200,
        marginTop: '0.5vw',
    }
})


const FormTemplate = (props) => {
        const classes = props.classes
        const {fields, addField, deleteField, updateField} = useFormState([])
        const [form, setForm] = useState({})
        const updateForm = (name, value) => {
            const newForm = form
            newForm[name] = value
            setForm(newForm)
        }
        const createForm = _ => {
            const fieldsNew = fields.map(field => {
                if(field.key){
                    delete field.key
                }
                field.constraints = field.constraints.map(constraint => {
                    if(constraint.key) {
                        delete constraint.key
                    }
                    return constraint
                })
                return field
            })
            const body = {fields: fieldsNew, ...form}
            axios('/api/formTemplate', {
                method: 'POST',
                headers: [{'Content-Type': 'application/json'}],
                data: body
            })
            .then( async res => {
                const resJson = await res.json()
                if(resJson.error) {
                    alert(resJson.error)
                }
            })
            .catch(error => {alert(error)})
        }

        return (
            <div className="formMeta">
                <div className='FormName'>
                    <TextField
                        required={true} className={classes.textField} variant="outlined"
                        onChange={e => updateForm(e.target.name, e.target.value)}
                        name='formNameEnglish' label='Form Name English'
                    />
                    <TextField
                        required={true} className={classes.textField} variant="outlined"
                        onChange={e => updateForm(e.target.name, e.target.value)}
                        name='formNameArabic' label='Form Name Arabic'
                    />
                </div>
                <div className='fields'>
                    {fields.map(({key}, i) => <Field key={key} keyy={key} index={i} deleteField={deleteField} updateField={updateField} />)}
                </div>
                <Button 
                    className={classes.button}
                    variant='contained'
                    onClick={addField}>
                    Add Field
                </Button>
                <Button
                    className={classes.button}
                    variant='contained'
                    onClick={createForm}>
                    Create Form
                </Button>
            </div>
        )
  }


export default withStyles(styles)(FormTemplate)

import React, { useState, useEffect } from 'react'
import { TextField, Paper, Menu, MenuItem, Button, withStyles, Checkbox, FormControlLabel } from '@material-ui/core'
import useConstraintState from './useConstraintState'
import useFieldState from './useFieldState'
import StringConstraint from './StringConstraint'
import NumberConstraint from './NumberConstraint'
import DateConstraint from './DateConstraint'

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
        marginTop: '0.5vw',
    }
})

const Field = ({index, classes, deleteField, updateField}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const {attributes, setAttributeWrap} = useFieldState({required: false})
    const {constraints, addConstraint, deleteConstraint, updateConstraint, resetConstraints} = useConstraintState([])
    const setAttribute = (name, value) => {
        setAttributeWrap(name, value)
        updateField(index, attributes)
    }
    useEffect(_ => setAttribute('constraints', constraints), [constraints])
    useEffect(_ => updateField(index, attributes), [attributes])
    const handleDropdownClick = (name, value) => {
        const oldValue = attributes.fieldType
        if(oldValue !== value){
            resetConstraints()
        }
        setAttribute(name, value)
        setAnchorEl(null)
    }
    const getConstraintTag = ({name, key}, index) => {
        switch(attributes.fieldType) {
            case 'text':
                return <StringConstraint key={key} index={index} name={name} updateConstraint={updateConstraint} deleteConstraint={deleteConstraint} />
            case 'number':
                return <NumberConstraint key={key} index={index} name={name} updateConstraint={updateConstraint} deleteConstraint={deleteConstraint} />
            case 'date':
                return <DateConstraint key={key} index={index} name={name} updateConstraint={updateConstraint} deleteConstraint={deleteConstraint} />
            default:
                return null
        }
    }
    return(
        <div className='formElement'>
        <Paper className={classes.root}>
        <h3>Field {index+1}</h3>
        <div id='common-props'>
            <TextField
                required={true} className={classes.textField} variant="outlined"
                onChange={e => {
                    setAttribute(e.target.name, e.target.value)
                    updateField(index, attributes)
                }
                }
                name='nameArabic' label='Name Arabic'
            />
            <TextField
                required={true} className={classes.textField} variant="outlined"
                onChange={e => setAttribute(e.target.name, e.target.value)}
                name='nameEnglish' label='Name English'
            />
            <FormControlLabel
            control={
            <Checkbox
            checked={attributes.required}
            onChange={() => setAttribute('required', !attributes.required)}/>
            }label='Required'/>
        </div>
        <div id='fieldType'> {/* This is the drop down menu for the field type*/}
            <Button
            className={classes.button}
            variant='contained'
            aria-owns={anchorEl? 'typeMenu':undefined}
            aria-haspopup='true'
            onClick={e => setAnchorEl(e.currentTarget)}
            >
            {attributes.fieldType || 'Choose Field Type'}
            </Button>
            <Menu
            id='typeMenu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={_ => setAnchorEl(null)}
            >
                <MenuItem onClick={_ => handleDropdownClick('fieldType', 'text')}>Text</MenuItem>
                <MenuItem onClick={_ => handleDropdownClick('fieldType', 'number')}>Number</MenuItem>
                <MenuItem onClick={_ => handleDropdownClick('fieldType', 'date')}>Date</MenuItem>
            </Menu>
            </div>
            <div id='constraints'>
            {constraints.map((e, i) => getConstraintTag(e, i))}
            </div>
            <Button className={classes.button} variant='contained' onClick={addConstraint}>Add Constraint</Button>
            <Button className={classes.button} variant='contained' onClick={() => deleteField(index)}>Remove field</Button>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(Field)
import React, {useState} from 'react'
import { Menu, MenuItem, Button, withStyles, TextField, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme =>  ({
    button: {
        margin: theme.spacing.unit*0.5
    },
    textField: {
        margin: theme.spacing.unit*0.5,
        width: 200
    },
    margin: {
        margin: theme.spacing.unit,
    }
})

const StringConstraint = ({index, classes, deleteConstraint, updateConstraint}) => {
    const [data, setData] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const update = e => {
        if(data.name) {
            updateConstraint(index, {name: data.name, value: e.target.value})
        }
    }
    const handleDropDown = (name, type) => {
        setData({name: name, type: type})
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton variant='contained' 
                className={classes.margin} 
                aria-label='Delete'
                onClick={()=>{deleteConstraint(index)}}
            >
                <DeleteIcon className={classes.rightIcon} />
            </IconButton>
            <Button
            className={classes.button}
            variant='contained'
            aria-owns={anchorEl? 'typeMenu':undefined}
            aria-haspopup='true'
            onClick = {e => setAnchorEl(e.currentTarget)}>
            {(data && data.name) || 'Constraint Type'}
            </Button>
            <Menu
            id='typeMenu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={_ => setAnchorEl(null)}>
                <MenuItem onClick={_=>handleDropDown('Minimum', 'number')}>Minimum</MenuItem>
                <MenuItem onClick={_=>handleDropDown('Maximum', 'number')}>Maximum</MenuItem>
            </Menu>
            {data? <TextField variant="outlined" type={data.type} className={classes.textField} onChange={update} label={data.name}/> : undefined}
        </div>
    )
}

export default withStyles(styles)(StringConstraint)
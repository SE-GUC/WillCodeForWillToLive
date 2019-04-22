import React, { useState, useEffect } from 'react'
import {withStyles, Typography, Button, TextField, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
    ...theme,
    button: {
        margin: theme.spacing.unit*0.5,
    },
    textField: {
        margin: theme.spacing.unit*0.5,
        width: 200,
        marginTop: '0.5vw',
    }
})

function DropdownItems ({classes, constraints, addConstraint, deleteConstraint, updateConstraint}) {
    const [newItem, setNewItem] = useState(null)
    useEffect(_=>setNewItem(null), [constraints])
    return (
        <div>
            {constraints.length === 0? undefined:
                <div id='items'>
                    <Typography component='h3' variant='subheading' gutterBottom align='left'>Items</Typography>
                    {constraints.map(({value, key},i) => (
                        <div key={key} id='item'>
                            <Typography component="h4" variant="body2" gutterBottom align='left'>
                            <IconButton variant='contained' 
                                aria-label='Delete'
                                onClick={_=>deleteConstraint(i)}
                            >
                                <DeleteIcon className={classes.rightIcon}/>
                            </IconButton>
                            {value}
                            </Typography>
                        </div>
                        )
                    )}
                </div>
            }
            <div id='control'>
                <TextField className={classes.textField}  onChange={e=>setNewItem(e.target.value)} value={newItem? newItem:''}></TextField>
                <Button variant='contained' onClick={_=>newItem?addConstraint(null, {name: 'item', value: newItem}):null}>Add item</Button>
            </div>
        </div>
    )
}

export default withStyles(styles)(DropdownItems)

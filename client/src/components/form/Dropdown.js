import React, { useState, useEffect } from 'react'
import {withStyles, Menu, MenuItem, Button} from '@material-ui/core'

const styles = theme =>  ({
    button: {
        margin: theme.spacing.unit*0.5,
    },
    item: {
        margin: theme.spacing.unit*0.5,
        width: 200,
    }
  })

const Dropdown = ({classes, fieldName, items, handleInput}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [item, setItem] = useState(null)
    const handleClick = name => {
        setItem(name)
        setAnchorEl(null)
    }
    useEffect((_=>handleInput(fieldName, item)),[item])
    return (
        <div>
            <Button
                className={classes.button}
                variant='contained'
                aria-owns={anchorEl? 'menu':undefined}
                aria-haspopup='true'
                onClick={e=>setAnchorEl(e.currentTarget)}
            >
                {item?item:fieldName}
            </Button>
            <Menu
            id='menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={_=>setAnchorEl(null)}
            >
                {items.map((name, i)=><MenuItem key={i.toString()} className={classes.item} onClick={_=>handleClick(name)}>{name}</MenuItem>)}
            </Menu>
        </div>
    )
}

export default withStyles(styles)(Dropdown)
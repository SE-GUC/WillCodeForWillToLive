import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Paper, withStyles, Button } from '@material-ui/core'
import axios from 'axios'

const styles = theme => ({
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
    }
})

const DisplayForm = props => {

    const [form, setForm] = useState(null)
    const {classes} = props
    const id = props.match.params.id
    useEffect(_=>{
        axios.get(`/api/form/${id}`)
        .then(res => setForm(res.data))
        .catch(error => alert(error))
    },[])

    const deleteForm = _ => {
        axios.delete(`/api/form/${id}`)
        .then(_=> props.history.push('/'))
        .catch(err => alert(err))
    }

    return(
        <Paper className={classes.root}>
            {!form? undefined:
                <div>
                    {form.map((element, index) => <div key={index}><span><b>{element.name}</b> {element.value} </span><br/></div>)}
                    <Link to={`/EditForm/${id}`} >
                        <Button variant='contained' aria-label='Edit' className={classes.button}>
                            Edit
                        </Button>
                    </Link>
                    <Button variant='contained' aria-label='Delete' className={classes.button} onClick={deleteForm}>
                        Delete
                    </Button>
                </div>
            }
        </Paper>
    )
}

export default withStyles(styles)(DisplayForm)
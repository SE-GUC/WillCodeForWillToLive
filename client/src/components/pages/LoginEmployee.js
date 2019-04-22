import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import nfetch from 'node-fetch'

import jwt from 'jsonwebtoken';
import tokenkey from '../../config/keys'
import  { Redirect } from 'react-router-dom'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginEmployee extends React.Component{
    state={
        username: '',
        password: '',
        showPassword: false
    }
    login = () => {
        const requestBody = {
            username: this.state.username,
            password: this.state.password
        }
        nfetch(`http://localhost:3002/login`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json'}

    }).then(res => res.json()).then(json =>{
      localStorage.clear()
      localStorage.setItem('token',Object.values(json)) 
      jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload) =>{
      if(err){
        alert(err)
      }else{
        if(payload.type === 'admin'){
          document.location.href = '/adminprofile'
        }
        if(payload.type === 'reviewer'){
          document.location.href = '/reviewerprofile'
        }
        if(payload.type === 'lawyer'){
          document.location.href = '/lawyerprofile'
        }
      }
      })
    }).catch(err => console.log(err))

    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
 render(){ const { classes } = this.props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" value={this.state.username} onChange={this.handleChange('username')} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.login}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}}

LoginEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginEmployee);
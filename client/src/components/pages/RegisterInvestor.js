    
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AlertDialogInvestorRegister from '../Dialog/AlertDialogInvestorRegister'
import { Link } from 'react-router-dom';

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
const genders = [
    {
      value: 'MALE',
      label: 'M',
    },
    {
      value: 'FEMALE',
      label: 'F',
    },
  ];

  class RegisterInvestor extends React.Component {
    state = {
        email: '',
  username: '',
  ID:'',
  typeOfID: '',
  name: '',
  nationality: '',
  capital: '',
  DOB: '01-01-1990',
  mobileNumber: '',
  address: '',
  faxNumber: '',
        gender: 'MALE',
    password: '',
    showPassword: false
}
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render (){
  const { classes } = this.props;

  return (
    <main className={classes.main}>
    <Link style={linkStyle} to="/signup">English</Link> | <Link style={linkStyle} to="/signupA">عربي</Link>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input value={this.state.email}
          onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Username</InputLabel>
            <Input value={this.state.username}
          onChange={this.handleChange('username')} id="username" name="username"  autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">ID</InputLabel>
            <Input value={this.state.ID}
          onChange={this.handleChange('ID')} id="ID" name="ID" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Type of ID</InputLabel>
            <Input value={this.state.typeOfID}
          onChange={this.handleChange('typeOfID')} id="typeOfID" name="typeOfID" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Name</InputLabel>
            <Input value={this.state.name}
          onChange={this.handleChange('name')} id="name" name="name" autoComplete="name" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Nationality</InputLabel>
            <Input value={this.state.nationality}
          onChange={this.handleChange('nationality')} id="nationality" name="nationality" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="number">Capital</InputLabel>
            <Input value={this.state.capital}
          onChange={this.handleChange('capital')} type = "number" id="capital" name="capital" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="date">Date fo Birth</InputLabel>
            <Input value={this.state.DOB}
          onChange={this.handleChange('DOB')} type = "date" id="DOB" name="DOB"  autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="number">Mobile Number</InputLabel>
            <Input value={this.state.mobileNumber}
          onChange={this.handleChange('mobileNumber')} type = "number" id="mobileNumber" name="mobileNumber"  autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Address</InputLabel>
            <Input value={this.state.address}
          onChange={this.handleChange('address')} id="address" name="address" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="text">Fax Number</InputLabel>
            <Input value={this.state.faxNumber}
          onChange={this.handleChange('faxNumber')} type="number" id="faxNumber" name="faxNumber" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <TextField
          required
          id="gender"
          select
          label="Gender"
          className={classes.textField}
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your gender"
          margin="normal"
        >
          {genders.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
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
        <AlertDialogInvestorRegister styles={{marginLeft:100}} stateinvestor={this.state}/>
        </form>
      </Paper>
    </main>
  );
}
}

RegisterInvestor.propTypes = {
  classes: PropTypes.object.isRequired,
};

const linkStyle = {
  color:'#000',
  float: 'center',
  align:'center',
  textDecoration: 'none'
}

export default withStyles(styles)(RegisterInvestor);
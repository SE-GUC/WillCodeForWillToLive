import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlertDialogLawyerRegister from '../Dialog/AlertDialogLawyerRegister'
import Header from '../layout/RegisterLawyerHeader'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
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

class RegisterLawyer extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    dob: '01-01-1990',
    gender: 'MALE',
    nationality: '',
    ID:'',
    typeofid: '',
    mobile:'',
    fax: '',
    email: '',
    showPassword: false
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <div>
            <Header />
      <form  noValidate autoComplete="off">
        <TextField
          required
          id="username"
          name="username"
          label="Username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange('username')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="email"
          placeholder = "Email"
          label="Email"
          value={this.state.emailAddress}
          onChange={this.handleChange('email')}
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-adornment-password"
          className={classes.textField}
          variant="outlined"
          margin="normal"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          value={this.state.firstName}
          onChange={this.handleChange('name')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        
        <br/>
        <TextField
          required
          id="ID"
          name="ID"
          label="ID"
          placeholder="ID"
          value={this.state.middleName}
          onChange={this.handleChange('ID')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="typeofid"
          name="typeofid"
          label="Type of ID"
          placeholder="Type of ID"
          value={this.state.lastName}
          onChange={this.handleChange('typeofid')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="dob"
          label="Date of Birth"
          name="dob"
          value={this.state.dob}
          onChange={this.handleChange('dob')}
          className={classes.textField}
          type="date"
          margin="normal"
          variant="outlined"
        />
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
          variant="outlined"
        >
          {genders.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        
        <br/>
        <TextField
          required
          id="nationality"
          name="nationality"
          label="Nationality"
          placeholder="Nationality"
          value={this.state.nationality}
          onChange={this.handleChange('nationality')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
       
        <TextField
          required
          id="mobile"
          name = "mobile"
          label="Mobile Number"
          placeholder = "Mobile Number"
          value={this.state.mobileNumber}
          onChange={this.handleChange('mobile')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
        required
          id="fax"
          name = "fax"
          label="Fax Number"
          placeholder = "Fax Number"
          value={this.state.faxNumber}
          onChange={this.handleChange('fax')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
      </form>
      <br/>
      <AlertDialogLawyerRegister  lawyeradmin={this.state}/>
     
      </div>
      </div>
    );
  }
}

RegisterLawyer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterLawyer);
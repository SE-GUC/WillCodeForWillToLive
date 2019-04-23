import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlertDialogAdminRegisterA from '../Dialog/AlertDialogAdminRegisterA'
import Header from '../layout/RegisterAdminHeader'
import jwt from 'jsonwebtoken'
import tokenkey from '../../config/keys'

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
    label: 'ر',
  },
  {
    value: 'FEMALE',
    label: 'م',
  },
];

class RegisterAdmin extends React.Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    DOB: '01-01-1990',
    gender: 'MALE',
    nationality: '',
    mobileNumber: '',
    faxNumber: '',
    emailAddress:'',
    address:'',
    showPassword: false
  };
  componentWillMount(){
    jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
      if(err){

        alert('برجاء تسجيل الدخول')
        document.location.href = '/loginemployee'

      }else{
        if(payload.type !== 'admin'){
          alert('لا يمكنك المتابعة')
          document.location.href = '/loginemployee'
        }
      }
    })
  }
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
          label="اسم المستخدم"
          placeholder="اسم المستخدم"
          value={this.state.username}
          onChange={this.handleChange('username')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
        required
          id="emailAddress"
          placeholder = "البريد الالكتروني"
          label="البريد الالكتروني"
          value={this.state.emailAddress}
          onChange={this.handleChange('emailAddress')}
          className={classes.textField}
          type="email"
          name="emailAddress"
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
          label="كلمة السر"
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
          <br/>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="الاسم الاول"
          placeholder="الاسم الاول"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        
      
        <TextField
        required
          id="middleName"
          name="middleName"
          label="الاسم الوسطي"
          placeholder="الاسم الوسطي"
          value={this.state.middleName}
          onChange={this.handleChange('middleName')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="lastname"
          name="lastname"
          label="اسم العائلة"
          placeholder="اسم العائلة"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="DOB"
          label="تاريخ الميلاد"
          name="DOB"
          value={this.state.DOB}
          onChange={this.handleChange('DOB')}
          className={classes.textField}
          type="date"
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="gender"
          select
          label="الجنس"
          className={classes.textField}
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="برجاء اختيار الجنس التابع لك"
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
          label="الموطن"
          placeholder="الموطن"
          value={this.state.nationality}
          onChange={this.handleChange('nationality')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
       
        <TextField
          required
          id="mobileNumber"
          name = "mobileNumber"
          label="رقم الموبايل"
          placeholder = "رقم الموبايل"
          value={this.state.mobileNumber}
          onChange={this.handleChange('mobileNumber')}
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
          id="faxNumber"
          name = "faxNumber"
          label="رقم الفاكس"
          placeholder = "رقم الفاكس"
          value={this.state.faxNumber}
          onChange={this.handleChange('faxNumber')}
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
          id="address"
          name="address"
          label="العنوان"
          placeholder="العنوان"
          value={this.state.address}
          onChange={this.handleChange('address')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
      </form>
      <br/>
      <AlertDialogAdminRegisterA  stateadmin={this.state}/>
     
      </div>
      
      </div>
    );
  }
}

RegisterAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterAdmin);
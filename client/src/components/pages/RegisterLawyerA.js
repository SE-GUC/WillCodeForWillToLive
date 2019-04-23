import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlertDialogLawyerRegisterA from '../Dialog/AlertDialogLawyerRegisterA'
import Header from '../layout/RegisterLawyerHeader'
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

class RegisterLawyerA extends React.Component {
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
          id="email"
          placeholder = "البريد الالكتروني"
          label="البريد الالكتروني"
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
        <TextField
          required
          id="name"
          name="name"
          label="الاسم"
          placeholder="الاسم"
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
          label="الهوية"
          placeholder="الهوية"
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
          label="نوعية الهوية"
          placeholder="نوعية الهوية"
          value={this.state.lastName}
          onChange={this.handleChange('typeofid')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="dob"
          label="تاريخ الميلاد"
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
          id="mobile"
          name = "mobile"
          label="رقم الموبايل"
          placeholder = "رقم الموبايل"
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
          label="رقم الفاكس"
          placeholder = "رقم الفاكس"
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
      <AlertDialogLawyerRegisterA  lawyeradmin={this.state}/>
     
      </div>
      </div>
    );
  }
}

RegisterLawyerA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterLawyerA);
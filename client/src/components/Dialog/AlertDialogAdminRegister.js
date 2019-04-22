import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import nfetch from 'node-fetch'

class AlertDialogAdminRegister extends React.Component {
  state = {
    open: false,
    msg:''
  };
  handleClickOpen = () => {
    const requestBody = {
        username: this.props.stateadmin.username,
        firstName: this.props.stateadmin.firstName,
        middleName: this.props.stateadmin.middleName,
        lastName: this.props.stateadmin.lastName,
        DOB: this.props.stateadmin.DOB,
        gender: this.props.stateadmin.gender,
        nationality: this.props.stateadmin.nationality,
        mobileNumber: this.props.stateadmin.mobileNumber,
        faxNumber: this.props.stateadmin.faxNumber,
        emailAddress: this.props.stateadmin.emailAddress,
        address: this.props.stateadmin.address,
        password: this.props.stateadmin.password
      }
     
      const response =nfetch(`http://localhost:3002/api/admin`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json' ,'Authorization':`Bearer ${localStorage.getItem('token')}`}
    }).then(res => res.json()).then(json => {this.setState({msg:Object.values(json)[0]})}).catch(err => this.setState({msg:'Something went wrong'}))
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button fullWidth variant="contained" color="primary" onClick={this.handleClickOpen}>
          Submit 
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"From Server"}</DialogTitle>
          <DialogContent style={{width: 600}}>
            <DialogContentText id="alert-dialog-description">
             {this.state.msg} 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogAdminRegister;
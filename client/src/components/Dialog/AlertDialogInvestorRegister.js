import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import nfetch from 'node-fetch'

class AlertDialogInvestorRegister extends React.Component {
  state = {
    open: false,
    msg:''
  };
  handleClickOpen = () => {
    const requestBody = {
        username: this.props.stateinvestor.username,
        name: this.props.stateinvestor.name,
        DOB: this.props.stateinvestor.DOB,
        gender: this.props.stateinvestor.gender,
        nationality: this.props.stateinvestor.nationality,
        mobileNumber: this.props.stateinvestor.mobileNumber,
        faxNumber: this.props.stateinvestor.faxNumber,
        email: this.props.stateinvestor.email,
        address: this.props.stateinvestor.address,
        password: this.props.stateinvestor.password,
        ID: this.props.stateinvestor.ID,
        typeOfID: this.props.stateinvestor.typeOfID,
        capital: this.props.stateinvestor.capital
      }
      const response =nfetch(`http://localhost:3002/api/investor`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json' ,'Authorization':`Bearer ${localStorage.getItem('token')}`}
    }).then(res => res.json()).then(json => this.setState({msg:Object.values(json)[0]})).catch(err => this.setState({msg:'Something went wrong'}))
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button fullWidth variant="contained" color="primary" onClick={this.handleClickOpen}>
          Sign Up 
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
            <Button onClick={this.handleClose} variant="outlined" color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogInvestorRegister;
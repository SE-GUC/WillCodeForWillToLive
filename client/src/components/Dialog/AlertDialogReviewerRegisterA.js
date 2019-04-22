import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import nfetch from 'node-fetch'

class AlertDialogReviewerRegisterA extends React.Component {
  state = {
    open: false,
    msg:''
  };
  handleClickOpen = () => {
    const requestBody = {
        name: this.props.lawyeradmin.name,
        username: this.props.lawyeradmin.username,
        password: this.props.lawyeradmin.password,
        birth_date: this.props.lawyeradmin.dob,
        nationallity: this.props.lawyeradmin.nationality,
        gender: this.props.lawyeradmin.gender,
        ID: this.props.lawyeradmin.ID,
        type_of_ID: this.props.lawyeradmin.typeofid,
        mobile_number: this.props.lawyeradmin.mobile,
        fax_number: this.props.lawyeradmin.fax,
        email: this.props.lawyeradmin.email,
        address: this.props.lawyeradmin.address  
    }
      const response =nfetch(`http://localhost:3002/api/admin/createreviewer`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json' }
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
          ارسال 
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
              حسنا
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogReviewerRegisterA;
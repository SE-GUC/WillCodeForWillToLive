import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class AlertDialogFees extends React.Component {
  state = {
    fees: 0,
    open: false,
  };

  handleClickOpen = (id) => {
    console.log(id)
    axios.get(`http://localhost:3002/api/form/calculateFees/${id}`).then(res => this.setState({fees:  Object.values(Object.values(res)[0])[0]}))
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
          <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen(this.props.formid)}>
          {this.props.buttonname}
        </Button>
        <Dialog

          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"" + this.props.dtitle}</DialogTitle>
          <DialogContent style={{width: 600}}>
            <DialogContentText id="alert-dialog-description">
              {'Total Fees: ' + this.state.fees + ' ' + this.props.currency}
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

export default AlertDialogFees;
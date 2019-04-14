import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AlertDialog from '../Dialog/AlertDialogFees';
import GridList from '@material-ui/core/GridList'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false };

// handle=(id)=>{
//     console.log(id)
//     axios.get(`http://localhost:3002/api/form/calculateFees/${id}`).then(res => alert("Total Fees: "+Object.values(Object.values(res)[0])[0]))
// }


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div >
          
            {
                    
                    <Card  className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="Form" className={classes.avatar}>
                            F
                          </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title= 'Form'    
                      />
                      <CardContent>
                        <Typography component="p">
                        {"Company Name : " + this.props.companynamearabic}
                        < br/>
                          {"Investor: " + this.props.investorname}
                        </Typography>
                      </CardContent>
                      <CardActions  className={classes.actions} disableActionSpacing>
                      <AlertDialog currency = {this.props.currency} formid = {this.props.formid} buttonname = {'Calculate Fees'} dtitle = {'Total Fees'}/>
                        <Button onClick={this.handleExpandClick} aria-expanded={this.state.expanded}>Details</Button>
                       
                      </CardActions>
                      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
            <h3>Company Name</h3>
            {"Company Name: " + this.props.companynamearabic}
            < br/>
            {"Company Name (English): " + this.props.companynameenglish}
            < br/>
            <h3>Company Legal Info</h3>
            {"Regualting Law: " + this.props.regulatingLaw}
            < br/>
            {"Company Type: " + this.props.companyType}
            < br/>
            <h3>HQ Info</h3>
            {"Governorate: " + this.props.governorate}
            < br/>
            {"City: " + this.props.hqcity}
            < br/>
            {"Telephone: " + this.props.hqtelephone}
            < br/>
            {"Fax: " + this.props.hqfax}
            < br/>
            <h3>Investor Info</h3>
            {"Capital Currency: " + this.props.currency}
            < br/>
            {"Capital: " + this.props.capital}
            < br/>
            {"Investor: " + this.props.investorname}
            < br/>
            {"Type: " + this.props.investortype}
            < br/>
            {"Gender: " + this.props.investorgender}
            < br/>
            {"Nationality: " + this.props.investornationality}
            < br/>
            {"ID Type: " + this.props.invetsoridtype}
            < br/>
            {"ID Number: " + this.props.investoridnumber}
            < br/>
            {"Birth Date: " + this.props.investordob}
            < br/>
            {"Telephone: " + this.props.investortelephone}
            < br/>
            {"Fax: " + this.props.investorfax}
            < br/>
            {"Email: " + this.props.investoremail}
            < br/>
            {"Address: " + this.props.investoraddress}
            </Typography>
          </CardContent>
        </Collapse>
                    </Card>
                 
           
            }
      </div>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
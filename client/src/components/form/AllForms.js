import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import axios from 'axios';
import FormsCards from './FormsCards';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginLeft: 300
      },
      gridList: {
        width: 700,
        height: 700 ,
      },
    });

class AllForms extends React.Component {
  state = { forms:[] };

  componentDidMount(){
    axios.get('http://localhost:3002/api/form').then(res => Object(res)).then(element => this.setState({forms:element.data}))
   }
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} >
        {this.state.forms.map((forms)=>{
           return(<div><FormsCards  companynamearabic = {forms.companyName.arabic} 
            companynameenglish = {forms.companyName.english}
            investorname = {forms.investorInfo.name} 
            formid = {forms._id}
            currency = {forms.investorInfo.capitalCurrency}
            regulatingLaw = {forms.companyLegalInfo.regulatingLaw}
            companyType = {forms.companyLegalInfo.companyType}
            governorate = {forms.hqInfo.governorate}
            hqcity = {forms.hqInfo.city}
            hqtelephone = {forms.hqInfo.telephone}
            hqfax = {forms.hqInfo.fax}
            capital = {forms.investorInfo.capital}
            investortype = {forms.investorInfo.type}
            investorgender = {forms.investorInfo.gender}
            investornationality = {forms.investorInfo.nationality}
            invetsoridtype = {forms.investorInfo.idType}
            investoridnumber = {forms.investorInfo.idNumber}
            investordob = {forms.investorInfo.birthdate}
            investortelephone = {forms.investorInfo.telephone}
            investorfax = {forms.investorInfo.fax}
            investoremail = {forms.investorInfo.email}
            investoraddress = {forms.investorInfo.address}
            /></div>)
           
        
        })}
        </GridList>
      </div>
    );
  }
}

AllForms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllForms);
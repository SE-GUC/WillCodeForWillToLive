import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup} from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

export class LawyerItem extends Component {

  state = {
    review_comment_by_lawyer: ''
  }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }

    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '15px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.caseVar.paid ? 'line-through' : 'none'
        }
    }

    textFOnChange = (e) => this.setState({review_comment_by_lawyer: e.target.value });

   
  render() {
      const { _id, lawyer} = this.props.caseVar;
    return (
      <div style={this.getStyle()}>
        <p>
            {lawyer}
            <ButtonGroup style = {btnStyle1}>
            <Button outline color = "success" style = {btnStyle2} onClick={this.props.accept.bind(this, _id)}>accept</Button>{' '}
            <Button outline color = "danger" style = {btnStyle1} onClick={this.props.reject.bind(this, _id)}>reject</Button>{' '}
            </ButtonGroup>
            <input type ="text" style={textfieldstyle} name="review_comment_by_lawyer" placeholder="Type your review..."
            value={this.state.review_comment_by_lawyer}
            onChange={this.textFOnChange}/> 
            <Button outline onClick={this.props.addreview.bind( this, _id, this.state.review_comment_by_lawyer)} color="primary" style = {btnStyle4}>review</Button>
            {' '}
            <Button style = {btnStyle3} onClick={this.props.payFees.bind(this, _id)}>Pay Fees</Button>{' '}
            <Button style = {btnStyle2} onClick={this.props.assigncase.bind(this, _id)}>Assign me this case</Button>{' '}

            </p>
      </div>
    )
  }
}

LawyerItem.propTypes= {
    caseVar: PropTypes.object.isRequired
}


const btnStyle1 = {
    float: 'right', 
}
const btnStyle2 = {
    float: 'right',
}
const btnStyle3 = {
    float: 'right',
    margin: '0px 40px'   
}
const textfieldstyle = {
  margin: '0px 60px', 
}
const floatingleft = {
  float: 'left'
}
const btnStyle4 = {
    margin: '0px 50px', 
    marginBottom: '1rem'  
}
const styles = theme => ({
    margin: {
      margin: theme.spacing.unit
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    }
  });

export default LawyerItem
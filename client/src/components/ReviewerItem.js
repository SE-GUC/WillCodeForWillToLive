import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup} from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Revieweritem extends Component {

  state = {
    review_comment_by_reviewer: ''
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
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.caseVar.reviewed_by_reviewer ? 'none' : 'line-through'
        }
    }

    textFOnChange = (e) => this.setState({review_comment_by_reviewer: e.target.value });

  render() {
      console.log("Props: " + this.props.caseVar)
      const { _id, reviewer} = this.props.caseVar;
    return (
      <div style={this.getStyle()}>
        <p>
            {reviewer}
            <ButtonGroup style = {btnStyle1}>
            <Button outline color = "success" style = {btnStyle2} onClick={this.props.accept.bind(this, _id)}>accept</Button>{' '}
            <Button outline color = "danger" style = {btnStyle1} onClick={this.props.reject.bind(this, _id)}>reject</Button>{' '}
            </ButtonGroup>
            <input type ="text" style={textfieldstyle} name="review_comment_by_reviewer" placeholder="Type your review..."
            value={this.state.review_comment_by_reviewer}
            onChange={this.textFOnChange}/> 
            <Button outline onClick={this.props.addreview.bind( this, _id, this.state.review_comment_by_reviewer)} color="primary" style = {btnStyle4}>review</Button>
            {' '}
            <Button outline color="secondary" style = {btnStyle3}  onClick={this.toggle}>Description</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            the case info
            </CardBody>
          </Card>
        </Collapse>
            </p>
      </div>
    )
  }
}

Revieweritem.propTypes= {
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
    margin: '0px 80px'   
}
const textfieldstyle = {
  margin: '0px 60px',
  float: 'left'  
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

export default Revieweritem

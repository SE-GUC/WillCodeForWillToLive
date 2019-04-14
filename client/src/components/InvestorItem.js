import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup} from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

export class InvestorItem extends Component {

  state = {
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
            textDecoration: this.props.caseVar.paid ? 'line-through' : 'none'
        }
    }

   
  render() {
      const { _id, investor} = this.props.caseVar;
    return (
      <div style={this.getStyle()}>
        <p>
            {investor}
            <ButtonGroup style = {btnStyle1}>
            <Button style = {btnStyle2} onClick={this.props.payFees.bind(this, _id)}>Pay Fees</Button>
            </ButtonGroup>
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

InvestorItem.propTypes= {
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

export default InvestorItem

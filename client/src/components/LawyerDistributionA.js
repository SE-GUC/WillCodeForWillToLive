import React, { Component } from 'react';
import LawyeritemA from './LawyerItemA';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class LawyerDistributionA extends Component {
    
    
    render(){
        console.log("hi2");
        return this.props.cases.map((caseVar) => (   
            <LawyeritemA key={caseVar.id} caseVar = {caseVar} payFees = {this.props.payFees} assigncase = {this.props.assigncase}
            accept = {this.props.accept} reject = {this.props.reject} addreview={this.props.addreview}/>
        ));
    }
}

LawyerDistributionA.propTypes= {
    cases: PropTypes.array.isRequired
}

export default LawyerDistributionA;
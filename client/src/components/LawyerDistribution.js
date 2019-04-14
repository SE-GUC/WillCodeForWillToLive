import React, { Component } from 'react';
import LawyerItem from './LawyerItem';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class LawyerDistribution extends Component {

    
    render(){
        return this.props.cases.map((caseVar) => (
            <LawyerItem key={caseVar.id} caseVar = {caseVar} payFees = {this.props.payFees} assigncase = {this.props.assigncase}
            accept = {this.props.accept} reject = {this.props.reject} addreview={this.props.addreview}/>
        ));
    }
}

LawyerDistribution.propTypes= {
    cases: PropTypes.array.isRequired
}

export default LawyerDistribution;
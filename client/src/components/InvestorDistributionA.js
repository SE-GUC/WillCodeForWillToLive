import React, { Component } from 'react';
import InvestorItemA from './InvestorItemA';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class InvestorDistributionA extends Component {

    
    render(){
        return this.props.cases.map((caseVar) => (
            <InvestorItemA key={caseVar.id} caseVar = {caseVar} payFees = {this.props.payFees}/>
        ));
    }
}

InvestorDistributionA.propTypes= {
    cases: PropTypes.array.isRequired
}

export default InvestorDistributionA;
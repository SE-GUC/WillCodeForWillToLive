import React, { Component } from 'react';
import InvestorItem from './InvestorItem';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class InvestorDistribution extends Component {

    
    render(){
        return this.props.cases.map((caseVar) => (
            <InvestorItem key={caseVar.id} caseVar = {caseVar} payFees = {this.props.payFees}/>
        ));
    }
}

InvestorDistribution.propTypes= {
    cases: PropTypes.array.isRequired
}

export default InvestorDistribution;
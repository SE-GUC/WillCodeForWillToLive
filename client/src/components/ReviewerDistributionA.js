import React, { Component } from 'react';
import RevieweritemA from './ReviewerItemA';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class ReviewerDistributionA extends Component {
    
    
    render(){
        console.log("hi2");
        return this.props.cases.map((caseVar) => (   
            <RevieweritemA key={caseVar.id} caseVar={caseVar} accept={this.props.accept} reject={this.props.reject}
            addreview={this.props.addreview} />
        ));
    }
}

ReviewerDistributionA.propTypes= {
    cases: PropTypes.array.isRequired
}

export default ReviewerDistributionA;
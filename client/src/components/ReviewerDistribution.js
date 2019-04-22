import React, { Component } from 'react';
import Revieweritem from './ReviewerItem';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class ReviewerDistribution extends Component {
    
    
    render(){
        console.log("hi2");
        return this.props.cases.map((caseVar) => (   
            <Revieweritem key={caseVar.id} caseVar={caseVar} accept={this.props.accept} reject={this.props.reject}
            addreview={this.props.addreview} />
        ));
    }
}

ReviewerDistribution.propTypes= {
    cases: PropTypes.array.isRequired
}

export default ReviewerDistribution;
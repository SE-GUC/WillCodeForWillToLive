import React, { Component } from 'react';
import Revieweritem from './ReviewerItem';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class ReviewerDistribution extends Component {

    
    render(){
        return this.props.cases.map((caseVar) => (
            <Revieweritem key={caseVar._id} caseVar={caseVar} accept={this.props.accept} reject={this.props.reject} />
        ));
    }
}

ReviewerDistribution.propTypes= {
    cases: PropTypes.array.isRequired
}

export default ReviewerDistribution;
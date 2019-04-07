import React, { Component } from 'react';
import Revieweritem from './ReviewerItem';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

class ReviewerDistribution extends Component {

    
    render(){
<<<<<<< HEAD
        console.log("hi2");
        return this.props.cases.map((caseVar) => (
            <Revieweritem key={caseVar.id} caseVar={caseVar} accept={this.props.accept} reject={this.props.reject}
            addreview={this.props.addreview} />
=======
        return this.props.cases.map((caseVar) => (
            <Revieweritem key={caseVar._id} caseVar={caseVar} accept={this.props.accept} reject={this.props.reject} />
>>>>>>> bd7a7e840a9e2fc958f2c53e9030bfb068329900
        ));
    }
}

ReviewerDistribution.propTypes= {
    cases: PropTypes.array.isRequired
}

export default ReviewerDistribution;
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup} from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

export class LawyeritemA extends Component {

  state = {
    review_comment_by_lawyer: ''
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
            padding: '15px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.caseVar.reviewed_by_lawyer ? 'none' : 'line-through'
        }
    }

    textFOnChange = (e) => this.setState({review_comment_by_lawyer: e.target.value });

  render() {
      console.log("Props: " + this.props.caseVar)
      const { _id, lawyer} = this.props.caseVar;
    return (
      <div style={this.getStyle()}>
        <p>
            {lawyer}
            <ButtonGroup style = {btnStyle1}>
            <Button outline color = "success" style = {btnStyle2} onClick={this.props.accept.bind(this, _id)}>قبول</Button>{' '}
            <Button outline color = "danger" style = {btnStyle1} onClick={this.props.reject.bind(this, _id)}>رفض</Button>{' '}
            </ButtonGroup>
            <input type ="text" style={textfieldstyle} name="review_comment_by_lawyer" placeholder="اكتب رأيك..."
            value={this.state.review_comment_by_lawyer}
            onChange={this.textFOnChange}/> 
            <Button outline onClick={this.props.addreview.bind( this, _id, this.state.review_comment_by_lawyer)} color="primary" style = {btnStyle4}>عرض</Button>
            {' '}
            <Button outline color="secondary" style = {btnStyle3}  onClick={this.toggle}>وصف</Button>
            <Button style = {btnStyle1} onClick={this.props.payFees.bind(this, _id)}>ادفع الرسوم</Button>{' '}
            <Button style = {btnStyle1} onClick={this.props.assigncase.bind(this, _id)}>اعين لي هذه الحالة</Button>{' '}
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <h3>معلومات الحالة</h3> 
            <div>الحالة : {this.props.caseVar.status}</div>
            <div>مستثمر : {this.props.caseVar.investor}</div>
            <div>مراجع : {this.props.caseVar.reviewer}</div>
            <div>المحامي : {this.props.caseVar.lawyer}</div>
            <div>اسم الشركة : {this.props.caseVar.company_name}</div>
            <div>هل تمت مراجعته بواسطة المحامي؟ : {this.props.caseVar.reviewed_by_lawyer}</div>
            <div>هل تم مراجعتها من قبل المراجع؟ : {this.props.caseVar.reviewed_by_reviewer}</div> 
            <div>تعليق المراجع : {this.props.caseVar.review_comment_by_reviewer}</div>
            <div>تعليق المحامي : {this.props.caseVar.review_comment_by_lawyer}</div>
            <div>رسوم : {this.props.caseVar.fees}</div>
            <div>المبلغ المدفوع : {this.props.caseVar.paid}</div>
            <div>المعين للعمل : {this.props.caseVar.assignee}</div>
            <div>أنشئت في : {this.props.caseVar.created_at}</div>
            <div>تم ? : {this.props.caseVar.isDone}</div>
            <div>تاريخ الاستحقاق : {this.props.caseVar.dueDate}</div>
            <div>وصف : {this.props.caseVar.description}</div>
            <div>أولوية: {this.props.caseVar.priority}</div>
            
            </CardBody>
          </Card>
        </Collapse>
            </p>
      </div>
    )
  }
}

LawyeritemA.propTypes= {
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
  margin: '0px 20px',  
}
const floatingleft = {
  float: 'left'
}
const btnStyle4 = {
    margin: '0px 20px', 
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

export default LawyeritemA

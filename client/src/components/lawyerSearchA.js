import React, { Component } from 'react';
// import nfetch from 'node-fetch'
import axios from 'axios';


class CasesLists extends Component{

    constructor(props) {
      super(props);
    }


    render() {

      const { cases } = this.props;

      return(

        <table>
          <thead>
            <tr>

            </tr>
          </thead>
          <tbody>
          {
              cases.map((cases)=> {
              return(
                <tr>
                <td>{<h5><div>تحديد الحالة: {cases._id}</div><div> وضع حالة : {cases.status}</div><div>  المستثمر: {cases.investor}</div><div>  المراجع:  {cases.reviewer}</div><div>  المحامي: {cases.lawyer}</div><div>  اسم الشركة : {cases.company_name}</div><div> مراجعة من قبل المحامي:  {cases.reviewed_by_lawyer}</div><div>  تعليق المحامي: {cases.review_comment_by_lawyer}</div><div>  تاريخ تعليق المحامي : {cases.review_date_by_lawyer}</div><div>  تاريخ تعليق المراجع: {cases.reviewed_by_reviewer}</div><div>  تعليق المراجع:  {cases.review_comment_by_reviewer}</div><div> تاريخ تعليق المراجع:  {cases.review_date_by_reviewer}</div></h5>}</td>
                </tr>
                )
              })
          }

          </tbody>
        </table>
              )
  }
}

class lawyerSearchA extends Component {

    constructor(props) {
      super(props);

      // bindings
      this.handleOptionChange = this.handleOptionChange.bind(this)
      this.filterByPickedValue = this.filterByPickedValue.bind(this)
      this.onHandleChange = this.onHandleChange.bind(this)
      this.onHandleSubmit = this.onHandleSubmit.bind(this)

    }

    state={
        cases:[],
        tmp:[],
        originalCases:[],
        text:"",
        pickedValue: "lawyer",
    };


    componentDidMount(){
         axios.get('http://localhost:3002/api/lawyer/getCases/',{headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}}).then(
           res => Object.values(res)[0]).then(
             element => {
              if(element.msg===undefined){
              this.setState({cases:element.data, originalCases: element.data})
            }else{
              alert(element.msg)
            }
          }
           ).catch(err => {alert('please make sure you are logged in');
           document.location.href = '/loginemployee'})
      };

    filterByPickedValue(){
      this.state.cases = this.state.originalCases

      for (var i = 0; i < this.state.cases.length; i++) {
        if(this.state.pickedValue ==='lawyer'){
          if(this.state.text === this.state.cases[i].lawyer){
            this.state.tmp.push(this.state.cases[i])

          }
        }else if (this.state.pickedValue === 'status') {
            if(this.state.text === this.state.cases[i].status){
              this.state.tmp.push(this.state.cases[i])
            }
        }else if (this.state.pickedValue === 'company_name') {
            if(this.state.text === this.state.cases[i].company_name){
              this.state.tmp.push(this.state.cases[i])
        }
      }
    }
    this.state.cases=this.state.tmp
    this.state.tmp=[]
    this.setState({});
    console.log(this.state.cases)
  };

    onHandleChange(e) {
      this.setState({
        text: e.target.value
      });
    }


    onHandleSubmit(e) {
     e.preventDefault();
     const text = this.state.text;
     if(text === ""){
       this.state.cases=this.state.originalCases
       this.setState({});
     }else{
       this.filterByPickedValue()
     }
     console.log(text)
   }

    handleOptionChange(changeEvent) {
      this.state.pickedValue = changeEvent.target.value;
    };

    render() {

      return(
        <div className="lawyerSearch">
        <h2>بحث عن محامي</h2>


        <form>
         <input
           id="mainInput"
           onChange={this.onHandleChange}
           placeholder="...ابحث هنا"
           value={this.state.text}
           type="text"
         />
         <button onClick={this.onHandleSubmit} type="submit"> ابحث
         </button>
       </form>


        <form action="">

          <input type="radio" name="name" value ="lawyer" onChange={this.handleOptionChange} defaultChecked /> اسم المحامي,
          <input type="radio" name="name" value="status" onChange={this.handleOptionChange}/> وضع الحالة,
          <input type="radio" name="name" value="company_name" onChange={this.handleOptionChange} /> اسم الشركة,

        </form>

        <CasesLists cases={this.state.cases}/>



        </div>
      );
    };
}

export default lawyerSearchA;

/*
const response = nfetch(`http://localhost:3002/api/admin/getCases`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => alert(Object.values(json)[0])).catch(err => alert('Something went wrong'))
    */

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import api from '../api.js';
import '../App.css';

const Table = React.createClass({
  componentWillMount() {
    console.log('getting students..');
    api.students().then((result) => {
      this.setState( { tableData: result });
    });
  },
  getInitialState() {
    return {
      tableData: null,
    };
  },
  imageFormatter(cell, row){
    const gender = row.gender === 'm' ? 'men' : 'women';
    const imgUrl = 'https://randomuser.me/api/portraits/thumb/' + gender + '/' + row.id + '.jpg';
    return "<img src='"+imgUrl+"'/>" ;
  },
  nameFormatter(cell, row){
    return row.last_name + ', ' + row.first_name;
  },
  render() {
    if (!this.state.tableData) {
      return (
        <div>No Data Available</div>
      )
    } else {
      return (
        <BootstrapTable data={this.state.tableData} striped hover pagination>
          <TableHeaderColumn dataField='id' width='70' dataAlign='center' dataFormat={this.imageFormatter}></TableHeaderColumn>
          <TableHeaderColumn dataField='last_name' className='vertical-align' width='175' isKey dataSort dataFormat={this.nameFormatter}>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='current_score' dataAlign='center' dataSort>Current</TableHeaderColumn>
          <TableHeaderColumn dataField='a1_score' dataAlign='center' dataSort >A1 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a2_score' dataAlign='center' dataSort >A2 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a3_score' dataAlign='center' dataSort >A3 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a4_score' dataAlign='center' dataSort >T1 (20)</TableHeaderColumn>
          <TableHeaderColumn dataField='a5_score' dataAlign='center' dataSort >A4 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a6_score' dataAlign='center' dataSort >A5 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a7_score' dataAlign='center' dataSort >A6 (10)</TableHeaderColumn>
          <TableHeaderColumn dataField='a8_score' dataAlign='center' dataSort >F (25)</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
});

module.exports = Table;


/*

with 
  a1_grades as (select student_id, score as a1_score from grades where grades.assignment_id = 1),
  a2_grades as (select student_id, score as a2_score from grades where grades.assignment_id = 2)
select students.id, first_name, last_name, 
  coalesce(a1_score, 0) as a1_score,
  coalesce(a2_score, 0) as a2_score
from students
  left join a1_grades on a1_grades.student_id = students.id  
  left join a2_grades on a2_grades.student_id = students.id;

*/

// https://randomuser.me/api/portraits/thumb/men/57.jpg

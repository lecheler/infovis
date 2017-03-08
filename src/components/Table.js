import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import api from '../api.js';
import '../App.css';

import data from './data';


const Table = React.createClass({
  componentWillMount() {
    // console.log('getting students..');
    // api.students().then((result) => {
    //   this.setState( { tableData: result });
    // });

    const d = data.STUDENT_CHARTS.datasets.map((value, key) => {  
      const obj = {id: key, name: value.name};
      value.data.forEach((value, key) => {
        obj['score_' + key] = value;
      });
      return obj;
    });
    this.setState({ tableData: d });
  },
  getInitialState() {
    return {
      tableData: data,
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
        <BootstrapTable data={this.state.tableData} striped hover condensed>
          <TableHeaderColumn dataField='name' className='vertical-align' width='80' isKey dataSort>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='score_1' dataAlign='center' dataSort >Sept</TableHeaderColumn>
          <TableHeaderColumn dataField='score_2' dataAlign='center' dataSort >PM1</TableHeaderColumn>
          <TableHeaderColumn dataField='score_3' dataAlign='center' dataSort >PM2</TableHeaderColumn>
          <TableHeaderColumn dataField='score_4' dataAlign='center' dataSort >PM3</TableHeaderColumn>
          <TableHeaderColumn dataField='score_5' dataAlign='center' dataSort >Oct</TableHeaderColumn>
          <TableHeaderColumn dataField='score_6' dataAlign='center' dataSort >PM4</TableHeaderColumn>
          <TableHeaderColumn dataField='score_7' dataAlign='center' dataSort >PM5</TableHeaderColumn>
          <TableHeaderColumn dataField='score_8' dataAlign='center' dataSort >Jan</TableHeaderColumn>
          <TableHeaderColumn dataField='score_1' dataAlign='center' dataSort >PM7</TableHeaderColumn>
          <TableHeaderColumn dataField='score_2' dataAlign='center' dataSort >PM8</TableHeaderColumn>
          <TableHeaderColumn dataField='score_3' dataAlign='center' dataSort >PM9</TableHeaderColumn>
          <TableHeaderColumn dataField='score_4' dataAlign='center' dataSort >Mar</TableHeaderColumn>
          <TableHeaderColumn dataField='score_5' dataAlign='center' dataSort >PM10</TableHeaderColumn>
          <TableHeaderColumn dataField='score_6' dataAlign='center' dataSort >PM11</TableHeaderColumn>
          <TableHeaderColumn dataField='score_7' dataAlign='center' dataSort >PM12</TableHeaderColumn>
          <TableHeaderColumn dataField='score_8' dataAlign='center' dataSort >May</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
});

module.exports = Table;
/*
{
  "id": 35,
  "first_name": "Zackary",
  "last_name": "Veale",
  "current_score": "0",
  "a1_score": "0",
  "a2_score": "0",
  "a3_score": "0",
  "a4_score": "0",
  "a5_score": "0",
  "a6_score": "0",
  "a7_score": "---",
  "a8_score": "---"
}
*/
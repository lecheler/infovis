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
      let exp = ['aim'];

      for (var index = 0; index < data.STUDENT_CHARTS.labels.length; index++) {
        obj['score_' + index] = value.data[index];
        exp.push(value.data[index]);
      }
      obj.expand = exp;
    //  console.log(obj);
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

  scoreFormatter(cell, row) {
    console.log(cell)
    return cell ? cell : '---';
  },

  isExpandableRow(row) {
    return true;
  },

  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  },

  render() {
    if (!this.state.tableData) {
      return (
        <div>No Data Available</div>
      )
    } else {
      return (
        <BootstrapTable data={this.state.tableData} expandableRow={this.isExpandableRow} expandComponent={ this.expandComponent } striped hover condensed>
          <TableHeaderColumn dataField='name' className='vertical-align' width='80' isKey dataSort>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='score_0' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >Sept</TableHeaderColumn>
          <TableHeaderColumn dataField='score_1' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM1</TableHeaderColumn>
          <TableHeaderColumn dataField='score_2' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM2</TableHeaderColumn>
          <TableHeaderColumn dataField='score_3' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM3</TableHeaderColumn>
          <TableHeaderColumn dataField='score_4' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >Oct</TableHeaderColumn>
          <TableHeaderColumn dataField='score_5' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM4</TableHeaderColumn>
          <TableHeaderColumn dataField='score_6' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM5</TableHeaderColumn>
          <TableHeaderColumn dataField='score_7' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >Jan</TableHeaderColumn>
          <TableHeaderColumn dataField='score_8' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM7</TableHeaderColumn>
          <TableHeaderColumn dataField='score_9' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM8</TableHeaderColumn>
          <TableHeaderColumn dataField='score_10' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM9</TableHeaderColumn>
          <TableHeaderColumn dataField='score_11' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >Mar</TableHeaderColumn>
          <TableHeaderColumn dataField='score_12' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM10</TableHeaderColumn>
          <TableHeaderColumn dataField='score_13' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM11</TableHeaderColumn>
          <TableHeaderColumn dataField='score_14' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >PM12</TableHeaderColumn>
          <TableHeaderColumn dataField='score_15' dataFormat={this.scoreFormatter} dataAlign='center' dataSort >May</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
});

module.exports = Table;

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <table className="table table-striped table-bordered table-hover table-condensed">
          <tbody>
            <tr>
              {
                this.props.data.map((value, key) => {
                  return(<td key={key}>{value}</td>)
                })
              }
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (<p>?</p>);
    }
  }
}

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
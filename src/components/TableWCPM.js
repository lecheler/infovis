import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import api from '../api.js';

const TableWCPM = React.createClass({
  componentWillMount() {
    // api.students().then((result) => {
    //   this.setState( { tableData: result });
    // });
  },
  getInitialState() {
    return {
      tableData: [
        {
          id: 1,
          first_name: 'Elene',
          last_name: 'Lecheler',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Reagan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 1,
          first_name: 'Zackary',
          last_name: 'Lecheler',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Justa',
          last_name: 'Miller',
          gender: 'm',
        },{
          id: 1,
          first_name: 'Corinne',
          last_name: 'Lecheler',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        },
        {
          id: 2,
          first_name: 'Tegan',
          last_name: 'Miller',
          gender: 'm',
        }
      ],
    };
  },
  imageFormatter(cell, row){
    const gender = row.gender === 'm' ? 'men' : 'women';
    const imgUrl = 'https://randomuser.me/api/portraits/thumb/' + gender + '/' + row.id + '.jpg';
    return "<img src='"+imgUrl+"'/>" ;
  },
  nameFormatter(cell, row){
    return row.first_name;
  },
  render() {
    if (!this.state.tableData) {
      return (
        <div>No Data Available</div>
      )
    } else {
      return (
        <BootstrapTable data={this.state.tableData} striped hover condensed>
          <TableHeaderColumn dataField='last_name' className='vertical-align' width='100px' isKey dataSort dataFormat={this.nameFormatter}>Student</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
});

module.exports = TableWCPM;

import React from 'react';
import {Button, Glyphicon, Modal} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import regression from 'regression';

import Chart from './Chart';
import data from './data';

const GREEN = '#AAD219';
const BLUE = '#20A8CC';
const RED = '#C80054';

const Table = React.createClass({
  componentWillMount() {
    
    let finalData = data.STUDENT_CHARTS.datasets;
    if (this.props.student) {
      const arr = [];
      arr.push(data.STUDENT_CHARTS.datasets[this.props.student]);
      finalData = arr;
    }

    const d = finalData.map((value, key) => {  
      const obj = {id: key, name: value.name};
      let exp = ['Aim'];
      const aim = this.getAimLine(value.data);
      aim.forEach((value, key) => {
        exp.push(value);
      });

      for (var index = 0; index < data.STUDENT_CHARTS.labels.length; index++) {
        obj['score_' + index] = value.data[index];
      }

      const rData = this.getRegressionLine(value.data);
      obj.final = Math.round(rData[rData.length-1]);
      obj.expand = exp;
      obj.scores = value.data;

      return obj;
    });
    this.setState({ tableData: d });
  },

  getInitialState() {
    return {
      tableData: data,
      studentIndex: 0,
      studentData: [],
    };
  },

  cellEditProp() {
    return {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    }
  },

  onAfterSaveCell(row, cellName, cellValue) {

    let arr = this.state.tableData[row.id].scores;

    if (cellValue !== "") {
      arr.push(parseInt(cellValue, 10));
    } else {
      arr.pop();
    }

    console.log(arr);

    const rData = this.getRegressionLine(arr);
    const final = Math.round(rData[rData.length-1]);
    this.state.tableData[row.id].final = final;

    let rowValues = [];
    for (const prop in row) {
      rowValues.push(parseInt(row[prop], 10));
    }
  },

  onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    // console.log('val =' + cellValue);
    return true;
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
    return cell ? cell : '-';
  },

  scoreFormatterEdit(cell, row) {
    let val = (
      <Glyphicon glyph="pencil" />
    );
    if (cell) {
      val = (
        <div>{cell}</div>
      )
    }
    return val;
  },


  finalFormatter(cell, row) {
    const diff = 1 + (cell - 115)/cell;
    let diffColor = RED;

    if (diff >= 1.0) {
      diffColor = GREEN;
    } else if (diff >= 0.9) {
      diffColor = BLUE;
    }
    return '<div style="background-color: ' + diffColor + '; color: #ffffff;">' + cell + '</div>';
  },

  statsFormatter(cell, row) {
    return <Button bsSize="xsmall" onClick={this.dataClick.bind(null, cell)}><Glyphicon glyph="stats" /></Button>;
  },

  dataClick(id) {
    console.log(id)
    this.setState({
      showModal: true, 
      student: [{
        name: data.STUDENT_CHARTS.datasets[id].name, 
        data: this.state.tableData[id].scores,
      }], 
      studentName: data.STUDENT_CHARTS.datasets[id].name
    });
  },

  isExpandableRow(row) {
    return true;
  },

  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  },

  getAimLine(points) {
    const interval = (115 - points[0])/(data.STUDENT_CHARTS.labels.length-1);

    let start = points[0];
    let val = [start];

    for (var index = 1; index < data.STUDENT_CHARTS.labels.length; index++) {
      val.push(Math.round(start+=interval));
    }

    return val;
  },

  getRegressionLine(points) {
    const d = points.map((student, key) => {
      return([key, student]);
    });

    const result = regression('linear', d); 
    const m = result.equation[0];
    const y = result.equation[1];

    let val = [];
    for (var index = 0; index < data.STUDENT_CHARTS.labels.length; index++) {
      val.push(m*index + y);
    }

    return val;
  },

  close() {
    this.setState({ showModal: false });
  },

  render() {
    if (!this.state.tableData) {
      return (
        <div>No Data Available</div>
      )
    } else {
      return (
        <div>
          <Modal bsSize='lg' show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.studentName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Chart width="" student={this.state.student} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
          <h4>Student ORF Words Correct Per Minute</h4>
          <BootstrapTable data={this.state.tableData} cellEdit={ this.cellEditProp() } striped hover condensed>
            <TableHeaderColumn dataField='name' editable={false} className='vertical-align' isKey dataSort>Student</TableHeaderColumn>
            <TableHeaderColumn dataField='score_0' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_1' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_2' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_3' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_4' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_5' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_6' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_7' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_8' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_9' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_10' editable={true} dataFormat={this.scoreFormatterEdit} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_11' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_12' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_13' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_14' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='score_15' editable={false} dataFormat={this.scoreFormatter} dataAlign='center' dataSort ></TableHeaderColumn>
            <TableHeaderColumn dataField='final' editable={false} dataFormat={this.finalFormatter} dataAlign='center' dataSort></TableHeaderColumn>
            <TableHeaderColumn dataField='id' editable={false} dataFormat={this.statsFormatter} dataAlign='center'></TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
});

module.exports = Table;

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <div>
          <table className="table table-striped table-bordered table-hover table-condensed">
            <tbody>
              <tr style={{backgroundColor: '#8a8a8a'}}>
                {
                  this.props.data.map((value, key) => {
                    return(<td key={key}>{value}</td>)
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (<p>?</p>);
    }
  }
}

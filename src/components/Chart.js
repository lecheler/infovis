import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { Grid, Row, Col } from 'react-bootstrap';

import TableWCPM from './TableWCPM';

import data from './data';


const endGoal = 115;
// const labels = ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"];
// from db...
// const scores = [75, 75, 76, 90, 86, 90, 106, 104, 115, 109, 113];
// const scores = [57, 67, 67, 66, 76, 76, 74, 91, 84, 89, 102];

var data2 = {
  labels: ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"],
  datasets: [
    {
      label: "Julia",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "rgba(75,192,192,1)",
      pointBorderWidth: 1,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: [1,2,3],
      spanGaps: false,
    },
  ],
};

const options = 
  {
    // maintainAspectRatio: false,
    // responsive: false,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    }
  };

const Chart = React.createClass({
  componentWillMount() {
    // this.getRegressionLine();
    // this.getAimLine();
  },
  getInitialState() {
    return {
      data: data.STUDENT_CHARTS.datasets,
    }
  },
  getDataObject(label, data, color, dashed) {
    const obj =
    {
      label: label,
      fill: false,
      lineTension: 0.1,
      backgroundColor: (dashed ? '#ffffff' : color),
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: (dashed ? [4] : []),
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
      spanGaps: false,
    };

    return obj;
  },
  getAimLine(points) {
    const interval = (endGoal - points[0])/(data.STUDENT_CHARTS.labels.length-1);

    let start = points[0];
    let val = [start];

    for (var index = 1; index < data.STUDENT_CHARTS.labels.length; index++) {
      val.push(start+=interval);
    }

    console.log(val);

    return val;
  //  data2.datasets.push(this.getDataObject('Aim', points, '#20A8CC', true));
  },
  getRegressionLine(points) {
    const d = points.map((student, key) => {
      return([key, student]);
    });

    const result = regression('linear', d); 
    const m = result.equation[0];
    const y = result.equation[1];

    let val = [];
    for (var index = 0; index < data2.labels.length; index++) {
      val.push(m*index + y);
    }

    return val;
    // data2.datasets.push(this.getDataObject('Projected', points, m > 0 ? '#AAD219' : '#C80054'))
  },
  handleListClick(data) {
    console.log(data);
  },
  render() {
    
    return (
      <div className="chartContainer">
        <h2>Words Correct Per Minute (WCPM)</h2>

        {
          this.state.data.map((value, key) => {
            const d = {
              labels: data.STUDENT_CHARTS.labels, 
              datasets: [
                this.getDataObject(value.name, value.data, '#20A8CC', false),
                this.getDataObject('Aim', this.getAimLine(value.data), '#20A8CC', true),
                this.getDataObject('Projected', this.getRegressionLine(value.data), '#AAD219', false),
              ]
            }

            return (
              <div key={key}>
                <h3>{value.name}</h3>
               <Line data={d} options={options} />
              </div>
            );
          })
        }

        <Grid>
          
        </Grid>
      </div>
    );
  },
});

export default Chart;

/*

<Row className="show-grid">
  <Col xs={6} md={4}>
    <h3>Select a Student</h3>
      <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
</Row>
<Row className="show-grid">
  <Col xs={6} md={4}>
    <h3>Select a Student</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
</Row>
<Row className="show-grid">
  <Col xs={6} md={4}>
    <h3>Select a Student</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
</Row>
<Row className="show-grid">
  <Col xs={6} md={4}>
    <h3>Select a Student</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
</Row>
<Row className="show-grid">
  <Col xs={6} md={4}>
    <h3>Select a Student</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
  <Col xs={6} md={4}>
    <h3>Luke</h3>
    <Line data={this.state.data} options={options} />
  </Col>
</Row>


<div className="chartContainer">
    <h2>Words Correct Per Minute (WCPM)</h2>
    <Grid>
        <Row className="show-grid">
          <Col xs={15} md={3}>
            <h3>Select a Student</h3>
            <TableWCPM />
          </Col>
          <Col xs={12} md={8}>
            <h3>Luke</h3>
            <Line data={this.state.data} options={options} />
          </Col>
        </Row>
    </Grid>
</div>
*/

// http://buildingrti.utexas.org/instructional-materials/progress-monitoring-line-graph
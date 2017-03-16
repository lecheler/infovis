import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { Grid, Row, Col } from 'react-bootstrap';

import TableWCPM from './TableWCPM';

import data from './data';


const endGoal = 115;
const GREEN = '#AAD219';
const BLUE = '#20A8CC';
const RED = '#C80054';
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
    },
    maintainAspectRatio: true
  };

const Chart = React.createClass({
  componentWillMount() {
    // this.getRegressionLine();
    // this.getAimLine();
  },
  getInitialState() {
    let finalData = data.STUDENT_CHARTS.datasets;
    if (this.props.student) {
      const arr = [];
      arr.push(data.STUDENT_CHARTS.datasets[this.props.student]);
      finalData = arr;
    }
    return {
      data: finalData,
    }
  },
  getDataObject(label, data, color, dashed, pointRadius) {
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
      pointRadius: pointRadius,
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
  handleListClick(data) {
    console.log(data);
  },
  render() {
    
    return (
      <div className="chartContainer">
        {
          this.state.data.map((value, key) => {
            const aim = this.getAimLine(value.data);
            const projected = this.getRegressionLine(value.data);
            const diff = (projected[projected.length-1] - endGoal)/projected[projected.length-1];
            let diffColor = RED;
            if (diff > 0.10) {
              diffColor = GREEN;
            } else if (diff > -0.10) {
              diffColor = BLUE;
            }

            const d = {
              labels: data.STUDENT_CHARTS.labels, 
              datasets: [
                this.getDataObject(value.name, value.data, '#BDBDBD', false, 5),
                this.getDataObject('Aim', aim, '#20A8CC', true, 0),
                this.getDataObject('Projected', projected, diffColor, false, 0),
              ]
            }

            return (
              <Line data={d} options={options} />
            );
          })
        }
      </div>
    );
  },
});

export default Chart;
// http://buildingrti.utexas.org/instructional-materials/progress-monitoring-line-graph
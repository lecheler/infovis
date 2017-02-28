import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { Grid, Row, Col } from 'react-bootstrap';

import TableWCPM from './TableWCPM';

const endGoal = 115;
const labels = ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"];
// from db...
const scores = [82, 57, 59, 62, 62, 66, 70, 71, 72, 72, 81];


var data = {
    labels: ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"],
    datasets: [
        {
            label: "Julia",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
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
            pointRadius: 6,
            pointHitRadius: 10,
            data: [55, 57, 59, 62, 62, 66, 70, 71, 72, 72, 81],
            spanGaps: false,
        },
        // {
        //     label: "Benchmark",
        //     fill: false,
        //     lineTension: 0.1,
        //     backgroundColor: "rgba(75,192,192,0.2)",
        //     borderColor: "rgba(75,192,192,0.5)",
        //     borderCapStyle: 'butt',
        //     borderDash: [10],
        //     borderDashOffset: 0.0,
        //     borderJoinStyle: 'miter',
        //     pointBorderColor: "rgba(75,192,192,1)",
        //     pointBackgroundColor: "#fff",
        //     pointBorderWidth: 1,
        //     pointHoverRadius: 5,
        //     pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //     pointHoverBorderColor: "rgba(220,220,220,1)",
        //     pointHoverBorderWidth: 2,
        //     pointRadius: 1,
        //     pointHitRadius: 10,
        //     data: [90, 91.7, 93.4, 95.1, 96.8, 98.5, 100.2, 101.9, 103.6, 105.3, 107, 108.7, 110.4, 112.1, 113.9, 115],
        //     spanGaps: false,
        // },
        {
            label: "Goal",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#20A8CC",
            borderColor: "#20A8CC",
            borderCapStyle: 'butt',
            borderDash: [4],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#20A8CC",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99, 103, 107, 111, 115],
            spanGaps: false,
        }
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
        this.getRegressionLine();
        this.getAimLine();
    },
    getInitialState() {
      return {
        data: data,
      }
    },
    getDataObject(label, data, color) {
        const obj =
        {
            label: label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDash: [],
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
    getAimLine() {
        const interval = (endGoal - scores[0])/(labels.length-1);

        let start = scores[0];
        let points = [start];

        for (var index = 1; index < data.labels.length; index++) {
          points.push(start+=interval);
        }

        return points;
    },
    getRegressionLine() {
        const d = data.datasets[0].data.map((student, key) => {
            return([key, student]);
        });

        const result = regression('linear', d); 
        const m = result.equation[0];
        const y = result.equation[1];

        let points = [];
        for (var index = 0; index < data.labels.length; index++) {
          points.push(m*index + y);
        }
        data.datasets.push(this.getDataObject('Projected', points, m > 0 ? '#AAD219' : '#C80054'))
    },
    handleListClick(data) {
        console.log(data);
    },
    render() {
        
        return (
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
        );
  },
});

export default Chart;


// http://buildingrti.utexas.org/instructional-materials/progress-monitoring-line-graph
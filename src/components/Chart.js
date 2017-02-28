import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';

var data = {
    labels: ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"],
    datasets: [
        {
            label: "Benchmark",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [5],
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
            data: [90, 91.7, 93.4, 95.1, 96.8, 98.5, 100.2, 101.9, 103.6, 105.3, 107, 108.7, 110.4, 112.1, 113.9, 115],
            spanGaps: false,
        },
        {
            label: "Goal",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [5],
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
            data: [55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99, 103, 107, 111, 115],
            spanGaps: false,
        },
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
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [55, 57, 59, 62, 62, 66, 70, 81],
            spanGaps: false,
        }
    ]
};

const d = [[0, 55], [1, 57], [2, 59], [3, 62], [4, 62], [5, 66], [6, 70], [7, 73]]
const result = regression('linear', d);
const slope = result.equation[0];
const yIntercept = result.equation[1];

// y = 2.52x + 54.17
// [54.17, ]

const Chart = React.createClass({
    componentWillMount() {
        this.getRegressionLine();
    },
    getInitialState() {
      return {
        data: data,
      }
    },
    getDataObject(label, data) {
        const obj =
        {
            label: label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#AAD219",
            borderColor: "#AAD219",
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
    getRegressionLine() {
        const d = data.datasets[2].data.map((student, key) => {
            return([key, student]);
        });
        const result = regression('linear', d); 
        const x = result.equation[0];
        const y = result.equation[1];

        let points = [];
        for (var index = 0; index < data.labels.length; index++) {
          points.push(x*index + y);
        }
        data.datasets.push(this.getDataObject('Projected', points))
    },
    render() {
        
        return (
          <div className='ui text container'>
            <Line data={this.state.data} />
          </div>
        );
  },
});

export default Chart;


// http://buildingrti.utexas.org/instructional-materials/progress-monitoring-line-graph
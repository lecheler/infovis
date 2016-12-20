import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

const Chart = React.createClass({
  render: function () {
    return (
      <div className='ui text container'>
        <Doughnut data={data} />
      </div>
    );
  },
});

export default Chart;
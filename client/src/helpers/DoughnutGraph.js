import { Doughnut } from 'react-chartjs-2';

import React from 'react';

const doughnutGraph = props => {
  const data = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <Doughnut
      data={data}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false
      }}
    />
  );
};

export default doughnutGraph;

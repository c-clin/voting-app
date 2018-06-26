import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = props => {
  console.log(props);
  const labels = props.poll.answers.map(obj => {
    return obj.answer;
  });

  const votes = props.poll.answers.map(obj => {
    return obj.votes;
  });

  console.log(labels);
  const data = {
    labels: labels,
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
      width={60}
      height={40}
      options={{
        maintainAspectRatio: false
      }}
    />
  );
};

export default DonutChart;

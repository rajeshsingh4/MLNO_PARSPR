import React from 'react';
import { Pie } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(ArcElement);

const ChartPie = (props) => {

  const createTATData = () => {
    let outsideTAT = 0, withinTAT = 0;
    props.files.forEach(file => {
      outsideTAT += file.bureauoutsidetat;
      withinTAT += file.bureauwithintat;
    })
    return [outsideTAT, withinTAT];
  }

  const data = {
    labels: [
      'OutSideTAT',
      'WithinTAT',
    ],
    datasets: [{
      data: createTATData(),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <CDBContainer>
      <h3 className="mt-5">{props.bureau.BureauName}</h3>
      <Pie data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default ChartPie;